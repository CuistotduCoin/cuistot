module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2e35ef922a3fd7fb1697";
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
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
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
/******/ 			var queue = outdatedModules.slice().map(function(id) {
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
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
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
/******/ 		// Not in "apply" phase
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
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
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
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, default */
/***/ (function(module) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"}};

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/gift.md":
/*!*******************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/gift.md ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "# Vous cherchez une idée cadeau originale ?\n\n## Pourquoi ne pas offrir une carte cadeau Cuistot du Coin pour participer à un atelier de cuisine au choix ?\nFête des mères et fête des pères, Noël, anniversaires, … Toutes les occasions sont bonnes pour cuisiner et passer un moment convivial et gourmand auprès de Cuistots passionnés !\n\n## Pour offrir une carte cadeau, c’est très simple !\n1. Envoyez-nous un mail à l’adresse suivante : contact@cuistotducoin.com ou contactez-nous au 06 79 59 88 48.\n2. Indiquez-nous le montant de votre carte cadeau et les coordonnées de la personne à qui vous souhaitez l’offrir. Précisez-nous la date à laquelle vous souhaitez offrir la carte cadeau et on se charge du reste !\n3. Cuistot du Coin enverra une carte cadeau par courrier ou par voie électronique à votre proche ainsi que toutes les informations nécessaires pour lui permettre de choisir son atelier et de s’y inscrire.\n\nA bientôt aux fourneaux !\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/howitworks.md":
/*!*************************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/howitworks.md ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "# Pour les gourmets\n\n1. Trouvez un atelier et réservez\n\nSélectionnez votre atelier et accédez à un descriptif détaillé.\nAprès avoir choisi votre atelier, il ne vous reste plus qu’à valider votre inscription en réglant votre participation en ligne et en toute sécurité.\nVous recevrez une confirmation d’inscription par mail.\n\n2. Participez et Dégustez\n\nProfitez de l’atelier pour découvrir de nouvelles saveurs. \nRencontrez d’autres Gourmets et cuisinez aux côtés du Cuistot lors de l’atelier.\nLes recettes sont adaptées à tous et sont reproductibles (usage de matériel du quotidien et réalisation de la recette de A à Z).\nChaque atelier se termine par un moment convivial en laissant place à la dégustation des préparations.\n\n3. Donnez votre avis et invitez vos amis\n\nA l’issue de l’atelier, Cuistot du Coin vous invite à donner votre appréciation de l’atelier.\nSi l’aventure Cuistot du Coin vous a plu, invitez vos amis à participer à nos ateliers. S’ils valident leur inscription, vous recevrez un bon d’achat d’une valeur de 10 € à valoir sur nos ateliers de cuisine.\n\n# Pour les cuistots\n\nDes cuistots passionnés et qualifiés\n-\tVérification d'identité :\n\nUne série de vérifications est réalisée pour s’assurer de l’identité de nos Cuistots : carte d’identité, réseaux sociaux, adresse e-mail, téléphone.\n-\tEntretien de motivation :\n\nChaque cuistot fait l'objet d'un entretien avec l'équipe de Cuistot du Coin afin de valider son sérieux et sa motivation. \n-\tAccompagnement :\n\nNos Cuistots sont accompagnés dans la création de leurs ateliers pour garantir des expériences culinaires riches en partage et en découvertes.\n-\tEvaluation par la communauté :\n\nA l’issue des ateliers, les Gourmets partagent leurs expériences et peuvent recommander l’atelier à leurs proches et ainsi prendre part à l’aventure Cuistot du Coin !\n\n# Pour les entreprises"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/invite.md":
/*!*********************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/invite.md ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Vous avez participé à l’un de nos ateliers et souhaitez les recommander à vos proches. Envoyez-leur une invitation pour s’inscrire à nos ateliers de cuisine. Dès lors qu’ils confirment leur inscription à l’un de nos ateliers, recevez un bon d’achat d’une valeur de 10 € à valoir sur l’ensemble de nos ateliers de cuisine."

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/join.md":
/*!*******************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/join.md ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Prêt à rejoindre l'aventure Cuistot du Coin ?\nNotre équipe grandit vite et nous sommes toujours à la recherche de nouveaux talents ! Si vous êtes entrepreneur, aventurier et que notre mission vous passionne, envoyez-nous un email à contact@cuistotducoin.com"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/mission.md":
/*!**********************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/mission.md ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "1. Des rencontres aussi riches que les saveurs en cuisine                                             \nAu-delà de la cuisine, Cuistot du Coin vous garantit des moments authentiques et chaleureux aux côtés de ses Cuistots passionnés. Partez à leur rencontre et voyagez avec leur cuisine.\n                                                                                                                                                                            \n2. La sauvegarde d’un patrimoine et de savoir-faire                                                                                                                \nCuistot du Coin valorise une cuisine authentique et savoureuse. Percez les secrets de recettes de famille ou de techniques culinaires traditionnelles en préparant ou en dégustant les plats de ses Cuistots.\n                    \n3. Une véritable Immersion dans des univers culinaires diversifiés                                                                                                 \nCuistot du Coin prône la diversité de saveurs en assurant la promotion d’ateliers et de repas variés. Voyagez, évadez-vous et ressourcez-vous en plongeant dans les univers culinaires de ses Cuistots. \n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/organize.md":
/*!***********************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/organize.md ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Chez Cuistot du Coin, on est convaincu que le talent culinaire est partout ! Et le meilleur moyen de partager son univers, ses connaissances et savoir-faire est de proposer un atelier de cuisine !\n\nVous serez bientôt aux fourneaux entourés de nos Gourmets désireux d'apprendre à cuisiner et de découvrir de nouvelles saveurs.\n\nMais avant, prenez quelques minutes pour nous faire part de votre histoire, vos inspirations culinaires, vos recettes ! \n\nDîtes-nous tout sur votre lien à la cuisine et on vous recontacte très vite pour convenir d’un rendez-vous !\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/presskit.md":
/*!***********************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/presskit.md ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "# Communiqué de presse\n\n# Ils parlent de nous\n\n# Ressources\n\n## Logo\n\n## Images\n\n## Videos\n\n## Liens sociaux\n\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/team.md":
/*!*******************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/team.md ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Cuistot du Coin a été fondée par 2 globe-trotteurs passionnés de cuisine. Après avoir partagé le quotidien d’agriculteurs et de cuisiniers de 10 pays d’Asie, d’Océanie et d’Amérique du Sud, Anaëlle et Romain ont posé leurs bagages en Bretagne pour créer leur entreprise.\n\nLeur objectif est de réunir gourmets et gourmands aux côtés de cuistots passionnés lors d’activités culinaires ou de repas authentiques et conviviaux. "

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/terms-pro.md":
/*!************************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/terms-pro.md ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "## ARTICLE 1 – CHAMP D’APPLICATION\n\nLes présentes conditions générales de vente sont conclues entre : \n\n-\tD’une part, la société CUISTOT DU COIN, société par actions simplifiée au capital de 5 000,00 Euros, sise 35 boulevard Gambetta à Le Relecq Kerhuon (29480), immatriculée au registre du commerce et des sociétés de Brest sous le numéro 830 700 019, \n\nCi-après désignée par « CUISTOT DU COIN », et, \n\n-\tD’autre part, tout client professionnel, à l’exclusion des particuliers, bénéficiant des prestations proposées par CUISTOT DU COIN et tels que décrites ci-après,\n\nCi-après désigné par le « Client »\n\nCUISTOT DU COIN et le Client pourront ci-après être désignés individuellement « Partie » et ensemble « les Parties ».\n\nConformément à la législation en vigueur, ces conditions générales de vente sont systématiquement communiquées à tout Client qui en fait la demande, pour lui permettre de passer commande auprès de CUISTOT DU COIN. \n\nToute commande de prestations auprès de CUISTOT DU COIN implique, de la part du Client, l’adhésion entière et sans réserve aux présentes conditions générales de vente, à l’exclusion de tout autre document en contradiction avec les présentes. \n\nToute condition contraire opposée par le Client sera donc, à défaut de l’acceptation préalable, expresse et écrite de CUISTOT DU COIN, inopposable à cette dernière, ce quel que soit le moment où elle aura pu être portée à sa connaissance. \n\nLes conditions générales de vente peuvent être modifiées à tout moment par CUISTOT DU COIN. Les conditions générales de vente applicables à toute commande de prestations seront celles en vigueur au jour de la commande. \n\n\n## ARTICLE 2 – OBJET DES PRESTATIONS\n\nCUISTOT DU COIN organise des ateliers de cuisine pour entreprises dans un esprit team building, intégrant l’élaboration des plats et leur dégustation. \n\nLes ateliers sont encadrés par des chefs animateurs professionnels. Le Client reconnaît à ce titre que l’exécution des prestations peut être librement sous-traitée par CUISTOT DU COIN. \n \nL’ensemble des matières premières ainsi que le matériel nécessaire à l’exécution des prestations est fourni par CUISTOT DU COIN. \n\nLes ateliers peuvent le cas échéant être organisés au sein même des locaux du Client. Le Client est alors seul responsable de l’adéquation du lieu à l’exécution des prestations ainsi que du respect de la réglementation applicable en matière d’hygiène et de sécurité. \n\nTout dommage qui pourrait être causé aux participants à ce titre serait donc de la seule responsabilité du Client qui s’engage à laisser CUISTOT DU COIN étrangère à toute action et/ou réclamation en résultant. \n\n\n## ARTICLE 3 – COMMANDE DES PRESTATIONS\n\nSur simple demande du Client, adressée par courriel ou par téléphone, CUISTOT DU COIN établit un devis gratuit sur mesure.\n\nCUISTOT DU COIN se réserve néanmoins le droit de refuser toute demande qui serait, sans que cette liste ne soit limitative : \n\n-\tIncompatible avec les disponibilités des chefs animateurs ; \n-\tAdressée dans un délai de prévenance insuffisant ;  \n-\tContraire à la réglementation applicable ; \n-\tContraire à l’ordre public et aux bonnes mœurs. \nLe devis indique notamment sa durée de validité, la description de l’atelier de cuisine, la date et le lieu de l’atelier, le nombre de participants personnes physiques minimum et maximum ainsi que le prix de l’atelier par participant. \n\nLe contrat sera réputé valablement et définitivement formé entre le Client et CUISTOT DU COIN dès réception par CUISTOT DU COIN du devis dûment daté et signé par le Client, revêtu de son cachet et de la mention « Bon pour accord », d’un exemplaire des présentes conditions générales de vente dûment paraphées et revêtues de la mention « Lu et approuvé », ainsi que du montant de l’acompte éventuel. \n\nToute modification des prestations devra faire l’objet d’un avenant signé par CUISTOT DU COIN et le Client. \n\nToute prestation complémentaire réalisée par CUISTOT DU COIN à la demande du Client et ne figurant pas sur le devis initial fera l’objet d’un nouveau devis et d’une facturation supplémentaire.\n\n\n## ARTICLE 4 – CONDITIONS D’ANNULATION \n\nSauf cas de force majeure, en cas d’annulation de l’atelier par le Client plus de 7 jours ouvrés avant la date de l’atelier, 100 % de l’acompte, tel qu’indiqué à l’article « CONDITIONS TARIFAIRES » ci-après sera facturé par CUISTOT DU COIN au Client, établi sur la base du nombre de participants maximum ou du nombre exact de participants si celui-ci a d’ores et déjà été confirmé par écrit par le Client. \n\nSauf cas de force majeure, en cas d’annulation de l’atelier par le Client moins de 7 jours ouvrés avant la date de l’atelier, le prix total des prestations sera facturé par CUISTOT DU COIN au Client, établi sur la base du nombre de participants maximum ou du nombre exact de participants si celui-ci a d’ores et déjà été confirmé par écrit par le Client.\n\nIl est entendu que l’annulation s’entend également d’une demande de report de la date de l’atelier qui ne pourrait pas être satisfaite par CUISTOT DU COIN. Cette annulation serait alors réputée à l’initiative exclusive du Client. \n\nLe nombre exact de participants doit être confirmé par écrit à CUISTOT DU COIN au plus tard 5 jours ouvrés avant la date de l’atelier, sans que ce nombre puisse être inférieur ou supérieur au minimum et au maximum fixés au devis. A défaut, CUISTOT DU COIN se réserve le droit d’annuler l’atelier, aux torts du Client, ou de modifier ses conditions tarifaires. \n\n\n## ARTICLE 5 – OBLIGATIONS DU CLIENT\n\nLe Client s’engage à fournir à CUISTOT DU COIN l’ensemble des informations nécessaires à la bonne exécution des prestations, et notamment les informations afférentes aux éventuelles restrictions alimentaires des participants personnes physiques. \n\nLe Client est à ce titre seul responsable de la complétude et de l’exactitude des informations recueillies auprès des participants et communiquées à CUISTOT DU COIN. \n\nLe Client s’engage par ailleurs à respecter strictement l’ensemble des consignes et recommandations, afférentes notamment à l’utilisation du matériel et à la sécurité des participants, qui seront adressées par CUISTOT DU COIN au cours de l’atelier. \n\nLe Client se porte fort du respect desdites consignes et recommandations par l’ensemble des participants. \n\nCUISTOT DU COIN n’est en tout état de cause en aucun cas responsable des dommages matériels ou corporels qui pourraient être occasionnés aux participants ou à leurs effets personnels au cours de l’atelier. \n\nLe Client garantit en conséquence CUISTOT DU COIN contre toute action, plainte ou réclamation qui serait portée à son encontre par un participant au titre notamment de la non-adéquation de l’atelier avec ses restrictions alimentaires et/ou des dommages qu’il subirait  résultant de sa participation à l’atelier. \n\n\n## ARTICLE 6 – CONDITIONS TARIFAIRES\n\nLe prix de l’atelier par participant est fixé au devis, en Euros et HT.\n\nUn acompte correspondant à 50 % du prix total des prestations commandées est exigé à la date de signature du devis, établi sur la base du nombre de participants maximum.\n\nLa facture finale adressée par CUISTOT DU COIN doit être réglée par le Client dans un délai de 30 jours à compter de sa date d’émission. \n\nLe règlement s’effectue par virement bancaire ou lettre de change..\n\nAucun escompte n’est pratiqué par CUISTOT DU COIN en cas de paiement anticipé. \n\nLe paiement est réputé réalisé lorsque les sommes en cause sont créditées sur le compte de CUISTOT DU COIN. \n\nTout retard de paiement porte, sans mise en demeure préalable et dès le jour suivant la date de règlement prévue, intérêts au taux de refinancement de la BCE le plus récent, majoré de 10 points, outre le paiement d’une indemnité forfaitaire pour frais de recouvrement fixée à 40 euros.\n\n\n## ARTICLE 7 – REFERENCE \n\nLe Client accepte expressément que CUISTOT DU COIN puisse faire état, au titre de « références client », des prestations fournies au Client en reproduisant et représentant ses signes distinctifs (dénomination sociale, nom commercial, marque, logo etc.) au sein des documents et outils de présentation de l’activité de CUISTOT DU COIN (plaquettes, brochures, sites Internet etc.).\n\n\n## ARTICLE 8 – RESPONSABILITES ET GARANTIES\n\nCUISTOT DU COIN s’engage à exécuter les prestations conformément aux règles de l’art et en professionnel diligent. La présente obligation, n'est, de convention expresse, que pure obligation de moyens.\n\nLe Client reconnaît avoir reçu de CUISTOT DU COIN toutes les informations nécessaires lui permettant d’apprécier l’adéquation des prestations à ses besoins. La commande de prestations effectuée par le Client est donc réalisée sous sa seule et entière responsabilité. \n\nCUISTOT DU COIN ne fournit aucune garantie expresse ou implicite quant à l’impact des prestations sur l’activité du Client, notamment quant à la productivité et à l’esprit de cohésion de ses collaborateurs. \n\nLa responsabilité de CUISTOT DU COIN ne peut être engagée qu’en cas de faute prouvée et est strictement limitée aux préjudices directs, à l’exclusion de tout préjudice indirect (pertes d’exploitation, de profit, d’une chance, de clientèle, manque à gagner, perte de données etc.). \n\nLe Client est seul responsable des obligations qui lui incombent à l’égard de ses préposés en sa qualité d’employeur. \n\nLa responsabilité de l’une ou l’autre des Parties ne pourra être mise en cause en cas de force majeure.\n\nPar force majeure, il faut entendre tout évènement tel que ceux habituellement retenus par la loi et la jurisprudence française. \n\nEn tout état de cause, la responsabilité de CUISTOT DU COIN ne pourra être recherchée pour un montant supérieur au prix total des prestations. \n\n\n## ARTICLE 9 – TOLERANCES \n\nLe fait pour CUISTOT DU COIN ou le Client de ne pas se prévaloir de l’un quelconque de ses droits en vertu des conditions générales de vente, ne pourra pas être interprété, quelles que soient la durée, l’importance ou la fréquence de cette tolérance, comme un abandon de son droit à faire observer ultérieurement, à tout moment, chacune des clauses et conditions des présentes. \n\n\n## ARTICLE 10 – INVALIDITE PARTIELLE \n\nLa nullité ou l’inapplicabilité de l’une quelconque des clauses et conditions des conditions générales de vente, pour quelque motif que ce soit, n’affectera en rien la validité des autres clauses et conditions qui conserveront donc toute leur force et leur portée. \n\n\n## ARTICLE 11 – LOI APPLICABLE – RESOLUTION DES LITIGES\n\nLes conditions générales de vente ainsi que les relations qu’elles régissent sont soumises à la loi française. \n\nEn cas de litige, CUISTOT DU COIN et le Client chercheront une solution amiable avant toute action judiciaire. \n\nEn cas d'échec de ces tentatives, toutes contestations liées à la validité, l’interprétation et/ou l’exécution des conditions générales de vente seront de la compétence exclusive des tribunaux de Brest, même en cas de référé, d’appel en garantie, de pluralité d’instances ou de parties, ou de demande incidente.\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/terms.md":
/*!********************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/terms.md ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "La plateforme collaborative d’ateliers de cuisine CUISTOT DU COIN permet de mettre en relation gourmets et cuistots désireux de partager leur savoir-faire culinaire. \n\nLe site https://www.cuistotducoin.com est édité par la société CUISTOT DU COIN, société par actions simplifiée au capital de 5 000,00 Euros, sise 35 boulevard Gambetta à Le Relecq Kerhuon (29480), immatriculée au registre du commerce et des sociétés de Brest sous le numéro 830 700 019 (ci-après « CUISTOT DU COIN »). \n\nCUISTOT DU COIN exerce une activité de mise en relation, et ne commercialise en son nom et pour son compte aucun service ni produit sur la plateforme. \n\nLes cuistots sont des particuliers ou des professionnels totalement indépendants, sans aucun lien de subordination et/ou de représentation avec CUISTOT DE COIN.\n\nPrésident et directeur de la publication\nRomain Quellec\n\n## Informatique & Libertés\nLes informations susceptibles d'être collectées sur le présent site sont exclusivement destinées au traitement de votre demande par CUISTOT DU COIN. Vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent (art. 34 de la loi Informatique et Libertés du 06 janvier 1978).\nPour plus d'informations : www.cnil.fr.\n\n## Hébergeur\nCUISTOT DU COIN est hébergé chez la société Amazone Web Services:\n\nAmazon Web Services LLC\nP.O. Box 81226\nSeattle, WA 98108-1226\nhttp://aws.amazon.com\n\n## Utilisation des données à caractère personnel\nVos données à caractère personnel sont collectées pour répondre à une ou plusieurs finalités suivantes :\n\nGérer votre accès à certains services accessibles sur le site et améliorer leur utilisation\nEffectuer les opérations relatives à la gestion des clients concernant la recherche d'activités culinaires\nConstituer un fichier de membres inscrits, d’utilisateurs, de clients et de prospects.\nAdresser des newsletters, sollicitations et messages promotionnels. Dans le cas où vous ne le souhaiteriez pas, nous vous donnons la faculté d’exprimer votre refus à ce sujet lors de la collecte de vos données.\nÉlaborer des statistiques commerciales et de fréquentation de nos services,\nGérer la gestion des avis des personnes sur des produits, services ou contenus,\nGérer les impayés et les contentieux éventuels quant à l’utilisation de nos produits et services\nRespecter nos obligations légales et réglementaires.\n\n## ARTICLE 1 – DEFINITIONS \n\nChaque fois qu’ils sont utilisés dans le cadre des présentes, les termes suivants ont la signification qui leur est donnée au présent article, qu’ils soient employés à la forme du singulier ou du pluriel : \n\nCGU : désigne les présentes conditions générales d’utilisation. \n\nPlateforme : désigne la plateforme collaborative CUISTOT DU COIN accessible à partir de l’adresse URL https://www.cuistotducoin.com/. \n\nAtelier : désigne l’atelier de cuisine présent sur la Plateforme. \n\nCuistot : désigne le particulier ou le professionnel organisant un Atelier. \n\nGourmet : désigne le particulier participant à un Atelier. \n\nUtilisateur : désigne toute personne accédant à la Plateforme, en ce compris les Gourmets et les Cuistots. \n\n\n## ARTICLE 2 – ACCEPTATION DES CONDITIONS GENERALES  \n\nL’accès et l’utilisation de la Plateforme supposent l’acceptation pleine et entière des CGU par l’Utilisateur. \n\nSi l’Utilisateur refuse de se conformer à l’une quelconque des obligations et conditions des CGU, il est invité à ne pas accéder à la Plateforme et à ne pas l’utiliser.\n\nCUISTOT DU COIN se réserve le droit d’adapter et de modifier les CGU. Les CGU en vigueur sont consultables à tout moment sur la Plateforme. Il incombe à l’Utilisateur de les consulter régulièrement. \n\n\n## ARTICLE 3 – PRE-REQUIS A l’ACCES ET A L’UTILISATION DE LA PLATEFORME\n\n3.1 Equipements\n\nL’Utilisateur est informé que la Plateforme est optimisée pour les navigateurs Internet récents.  \n\nLes frais afférents aux équipements nécessaires à l’accès et à l’utilisation de la Plateforme demeurent à la charge exclusive de l’Utilisateur.  \n\nL’Utilisateur est seul responsable de la compatibilité et du bon fonctionnement de ses équipements. \n\nCUISTOT DU COIN n’est pas responsable des dommages qui pourraient être causés au matériel informatique de l’Utilisateur du fait de l’utilisation de la Plateforme. Il incombe en particulier à l’Utilisateur de protéger son matériel informatique contre toute forme d'intrusion et/ou de contamination par des virus. \n\nCUISTOT DU COIN assure tout mettre en œuvre pour assurer un accès et un fonctionnement permanent de la Plateforme. L’Utilisateur reconnaît néanmoins qu’eu égard notamment aux spécificités du réseau Internet, CUISTOT DU COIN ne saurait raisonnablement garantir la continuité d’accès et de fonctionnement de la Plateforme. \n\nEn outre, pour la bonne gestion de la Plateforme, CUISTOT DU COIN se réserve le droit de suspendre, interrompre ou limiter l’accès à tout ou partie de la Plateforme, notamment dans le cadre d’opérations de maintenance. \n\n3.2 Inscription \n\nL’Utilisateur ne peut accéder aux prestations de mise en relation proposées sur la Plateforme qu’après avoir renseigné un formulaire, soit en sa qualité de Cuistot, soit en sa qualité de Gourmet. \n\nS’agissant du Cuistot \n\nLe Cuistot propose l’Atelier de son choix en renseignant notamment les informations suivantes : nom, prénom, adresse e-mail, numéro de téléphone, descriptif de l’Atelier (recette, profil du Cuistot, amateur ou professionnel), date de l’Atelier, nombre de Gourmets minimum et maximum, prix par Gourmet. \n\nLa publication de l’Atelier sur la Plateforme est en tout état de cause soumise à la validation de CUISTOT DU COIN. \n\nCUISTOT DU COIN se réserve notamment le droit de refuser un Atelier qui ne répondrait pas aux exigences de qualité et de sérieux qui président à l’esprit de la Plateforme, ou encore qui serait redondant avec les autres Ateliers présents au même moment sur la Plateforme. \n\nLe lieu d’organisation de l’Atelier peut être soit le domicile personnel du Cuistot, soit un lieu partenaire de CUISTOT DU COIN. \n\nS’agissant du Gourmet\n\nLe Gourmet s’inscrit à l’Atelier de son choix en renseignant notamment les informations suivantes : nom, prénom, adresse e-mail, numéro de téléphone, restrictions alimentaires éventuelles. \n\nL’inscription à un Atelier est en principe définitive, au regard notamment des impératifs liés à l’organisation de l’Atelier (achat des matières premières par le Cuistot, le cas échéant réservation du lieu partenaire). \n\nL’inscription est validée dès lors que le Gourmet effectue son règlement en ligne par carte bancaire (système de paiement en ligne sécurisé depuis la Plateforme avec le prestataire de services de paiement MangoPay).\n\nL’acceptation des ces CGU vaut acceptation des conditions générales d’utilisation de MangoPay, disponibles sur le lien de bas de page “CGU MangoPay”.\n\n\n## ARTICLE 4 – OBLIGATIONS DU CUISTOT ET DU GOURMET \n\nS’agissant du Cuistot \n\nLe Cuistot reconnaît qu’en proposant un Atelier sur la Plateforme, il s’engage à : \n\n-\tFournir des informations complètes et conformes à la réalité \n-\tFournir un Atelier conforme à sa description sur la Plateforme : descriptif de l’Atelier, date de l’Atelier, prix par Gourmet etc. \n-\tEtre l’organisateur effectif de l’Atelier proposé\n-\tPréciser les éventuelles spécificités liées à la recette de l’Atelier (présence de l’un des 14 allergènes alimentaires majeurs, recette qui ne conviendrait pas à certains régimes alimentaires particuliers : sans gluten, végétarien, sans porc etc.)\n-\tRespecter les exigences en matière d’hygiène alimentaire \n\nS’agissant du Gourmet\n\nLe Gourmet reconnaît qu’en s’inscrivant à l’Atelier, il s’engage à : \n\n-\tFournir des informations complètes et conformes à la réalité \n-\tVerser la participation financière demandée (paiement en ligne au moment de l’inscription)\n-\tRespecter l’équipement du Cuistot, que l’Atelier soit organisé à son domicile personnel ou dans un lieu partenaire \n\n## ARTICLE 5 – POLITIQUE RELATIVE AU CONTENU \n\nEn publiant du contenu sur la Plateforme (descriptif de l’Atelier, commentaires intégrés au blog etc.) l’Utilisateur accepte de se conformer aux règles de CUISTOT DU COIN en matière de contenu.\n\nCUISTOT DU COIN se réserve le droit de retirer, en partie ou en totalité, tout contenu qui irait à l’encontre de ces règles à sa seule discrétion. \n\nLes contenus suivants, sans que cette liste ne soit limitative, sont formellement prohibés par CUISTOT DU COIN : \n\n-\tPublicité ou autre contenu à caractère commercial\n-\tContenu qui approuve ou encourage les activités illégales, contraires à l’ordre public ou aux bonnes mœurs, et notamment des propos profanes, vulgaires, obscènes, menaçants, racistes ou diffamatoires\n-\tContenu discriminatoire\n-\tTentatives d'usurpation d'identité\n-\tContenu allant à l'encontre des droits d'un tiers ou d'une entité, y compris les droits de propriété intellectuelle et les droits à la vie privée\n-\tContenu permettant d’identifier l'adresse du domicile d’une personne physique ou tout autre contenu pouvant présenter un risque pour sa sécurité personnelle \n-\tContenu frauduleux, faux, trompeur ou mensonger afférent à l’Atelier \n-\tCommentaires qui n'ont pas trait à l'expérience personnelle vécue par l'Utilisateur \n-\tCommentaires utilisés à des fins d'extorsion \n-\tContenu provoquant ou ciblant à plusieurs reprises un Utilisateur\n\nCUISTOT DU COIN invite tout Utilisateur à l'alerter s'il découvre sur la Plateforme du contenu qui constitue une violation aux lois et règlements en vigueur et/ou aux présentes CGU. Pour signaler un abus, l'Utilisateur peut avertir CUISTOT DU COIN de la façon suivante : par mail à contact@cuistotducoin.com. \n\t\nCe signalement doit être accompagné de l'ensemble des informations permettant à CUISTOT DU COIN d'identifier le contenu illicite ou frauduleux. \n\n\n## ARTICLE 6 – FRAIS DE SERVICE\n\nCUISTOT DU COIN facture des frais de service au Cuistot en contrepartie de l’utilisation de la Plateforme. \n\nLes frais de service correspondent à un pourcentage appliqué sur la recette totale de l’Atelier. \n\nLe pourcentage des frais de service applicable est en tout état de cause communiqué au Cuistot avant que l’Atelier ne soit publié sur la Plateforme. \n\n\n\n\n\n## ARTICLE 7 – RESPONSABILITES ET GARANTIES \n\nCUISTOT DU COIN met tout en œuvre pour que les Ateliers proposés sur la Plateforme répondent à des exigences de qualité et de sérieux élevées.\n\nLe Cuistot et le Gourmet reconnaissent néanmoins que CUISTOT DU COIN n’intervient qu’au seul titre de leur mise en relation. \n\nEn proposant un Atelier d’une part, et en s’inscrivant à l’Atelier d’autre part, le Cuistot et le Gourmet concluent un accord juridiquement contraignant au titre duquel le Cuistot s’engage à fournir la prestation décrite, et le Gourmet à payer le prix convenu. \n\nCUISTOT DU COIN n’est donc en aucun cas responsable de l’exécution de la relation finale entre le Cuistot et le Gourmet. Elle n’est notamment pas responsable de la qualité de la prestation fournie par le Cuistot ni des éventuels incidents de payement. \n\nCUISTOT DU COIN ne saurait en outre être tenue responsable des dommages qui pourraient être occasionnés à l’équipement du Cuistot (domicile, matériel), à la personne du Cuistot et/ou du Gourmet à l’occasion de l’Atelier. \n\nLe Gourmet s’inscrit à l’Atelier sous sa seule et entière responsabilité. Il lui appartient en particulier, avant toute inscription, de contacter CUISTOT DU COIN aux fins de s’informer de l’adéquation de l’Atelier avec ses éventuelles restrictions alimentaires. Le Gourmet reconnaît néanmoins que CUISTOT DU COIN ne pourra à ce titre que lui adresser : \n\n-\tDes informations à caractère informatif\n-\tLes informations communiquées par le Cuistot, dont CUISTOT DU COIN ne saurait garantir ni l’exactitude, ni la complétude, ni l’application effective par le Cuistot\n\nLe Cuistot est quant à lui seul responsable des obligations qui lui incombent le cas échéant en matière fiscale. CUISTOT DU COIN recommande à ce titre au Cuistot de se rapprocher d’un sachant. \n\n\n## ARTICLE 8 – SUSPENSION DE L’ACCES A LA PLATEFORME\n\nSans préjudice de tous dommages et intérêts que CUISTOT DU COIN pourrait solliciter, CUISTOT DU COIN se réserve le droit de suspendre de manière temporaire ou définitive l’accès d’un Utilisateur à la Plateforme en cas notamment de :\n\n-\tnon-respect par l’Utilisateur des présentes CGU, et notamment : \no\tNon-respect des règles en matière de contenu\no\tAtelier non-conforme aux informations communiquées\no\tDétérioration de l’équipement du Cuistot \n\n-\tnon-respect par l’Utilisateur des lois et règlements en vigueur\n\n\n\n\n## ARTICLE 9 – LIENS HYPERTEXTES ET BANNIERES PUBLICITAIRES\n\nLa Plateforme peut contenir des liens hypertextes et/ou des bannières publicitaires renvoyant vers des sites Internet de tiers proposant des informations, opinions et recommandations et/ou fournissant différents services et/ou produits.\n\nCUISTOT DU COIN ne peut en aucun cas être tenue pour responsable de la disponibilité technique desdits sites auxquels l’Utilisateur accéderait par l’intermédiaire de la Plateforme. \n\nCUISTOT DU COIN n’endosse par ailleurs aucune responsabilité au titre des contenus, publicités, produits et/ou services disponibles sur de tels sites dont il est rappelé à l’Utilisateur qu’ils sont régis par leurs propres conditions générales d’utilisation et/ou de vente qu’il lui appartient de consulter. \n\n\n## ARTICLE  10 – PROPRIETE INTELLECTUELLE \n\nLes systèmes, logiciels, structures, infrastructures, chartes graphiques, bases de données et contenus de toute nature (textes, images, visuels, vidéos, musiques, logos, marques etc.) exploités par CUISTOT DU COIN sur la Plateforme sont protégés par tous droits de propriété intellectuelle ou droits des producteurs de bases de données en vigueur. \n\nIls sont la propriété pleine et entière de CUISTOT DU COIN ou de ses partenaires. \n\nTous désassemblages, décompilations, décryptages, extractions, réutilisations, copies et plus généralement, tous actes de reproduction, représentation, diffusion et utilisation de l’un quelconque de ces éléments, en tout ou partie, sans l’autorisation préalable, expresse et écrite de CUISTOT DU COIN sont strictement interdits et pourront faire l’objet de poursuites judiciaires. \n\n\n## ARTICLE  11 – COOKIES \n\nUn cookie est une information déposée sur l’équipement de l’Utilisateur par le serveur de la Plateforme, ou par un serveur tiers. Un cookie permet de mémoriser les choix faits par l’Utilisateur et de reconnaître facilement l’Utilisateur par le biais d’un identifiant unique.\n\nPour la gestion du contenu de la Plateforme, CUISTOT DU COIN dépose des cookies sur l’équipement de l’Utilisateur. \n\nConformément à l’article 32-II de la loi du 6 janvier 1978, CUISTOT DU COIN informe l’Utilisateur par un bandeau que la poursuite de sa navigation vaut accord pour l’installation et la lecture de cookies.\n\nLes cookies utilisés ont pour finalité :\n\n-\tde stocker les préférences de l’Utilisateur et ainsi adapter le contenu de la Plateforme en fonction de son utilisation / son besoin ;\n-\tde permettre une utilisation optimale de la Plateforme ;\n-\td’identifier l’utilisation faite de la Plateforme et la navigation de l’Utilisateur à travers l’ensemble des pages de la Plateforme. \n\nLes cookies déposés par CUISTOT DU COIN nécessaires à la fourniture d'un service expressément demandé par l’Utilisateur ne feront pas l’objet d’un recueil de consentement préalable.\n\nLes cookies supplémentaires déposés par CUISTOT DU COIN pour réaliser des mesures d’audience ou pour générer des partages de réseaux sociaux exigent le recueil exprès du consentement de l’Utilisateur, qui dispose de la faculté de refuser les cookies déposés. \nL’Utilisateur peut en tout état de cause refuser l’installation de cookies déposés par CUISTOT DU COIN sur son équipement en sélectionnant les paramètres appropriés dans son navigateur. \n\nLes cookies sont conservés par CUISTOT DU COIN pendant treize (13) mois. A l’expiration de ce délai, CUISTOT DU COIN recueille de nouveau, quand il est nécessaire, le consentement de l’Utilisateur. \n\n\n## ARTICLE  12 – DONNEES PERSONNELLES \n\nLa Plateforme met en œuvre un système de collecte et de traitement de données à caractère personnel des Utilisateurs. \n\nEn conséquence, le fichier et les traitements s’y rapportant, recueillant les données à caractère personnel des Utilisateurs a fait l’objet d’une déclaration préalable auprès de la Commission Nationale de l’Informatique et des Libertés (CNIL) enregistrée sous le n° [__________________________]. \n\nCes données sont collectées pour permettre à l’Utilisateur d’accéder à l’ensemble des fonctionnalités de la Plateforme dont il a volontairement et librement souhaité bénéficier. \n\nDans le but de faciliter la mise en relation entre le Cuistot et le Gourmet, certaines des données à caractère personnel du Cuistot et/ou du Gourmet sont partagées avec le Cuistot et/ou le Gourmet. \n\nEn cas d’utilisation des données à des fins de prospection commerciale par CUISTOT DU COIN et/ou ses partenaires, le consentement préalable de l’Utilisateur est recueilli. \n\nCUISTOT DU COIN pourrait être conduite à collecter et traiter des données dites sensibles, au sens de l’article 8-I de la Loi 78-17 du 6 janvier 1978 modifiée : « données à caractère personnel qui font apparaître, directement ou indirectement, les origines raciales ou ethniques, les opinions politiques, philosophiques ou religieuses ou l’appartenance syndicale des personnes, ou qui sont relatives à la santé ou à la vie sexuelle de celles-ci ».\n\nA titre d’exemple, les données en lien avec le régime alimentaire du Gourmet pourraient constituer des informations à caractère religieux. \n\n\n\nLa communication de ces données sensibles demeure facultative et leur collecte ainsi que leur traitement supposent en tout état de cause le consentement exprès et préalable de l’Utilisateur. A ce titre, pour toute demande de données sensibles, l’Utilisateur sera invité à matérialiser son consentement en  cochant la case prévue à cet effet.\n\nConformément à la loi « informatique et libertés » n°78-17 du 6 janvier 1978, l’Utilisateur bénéficie d’un droit d’accès et de rectification aux informations qui le concernent. S’il souhaite exercer ce droit et obtenir communication des informations le concernant, l’utilisateur  est invité à contacter CUISTOT DU COIN de la façon suivante : par mail à contact@cuistotducoin.com.  \n\n\n## ARTICLE 13 – CONTACT \n\nPour toute information ou question concernant la Plateforme, l’Utilisateur peut contacter CUISTOT DU COIN de la façon suivante : par mail à contact@cuistotducoin.com.  \n\n\n## ARTICLE 14 – TOLERANCES \n\nLe fait pour CUISTOT DU COIN ou l’Utilisateur de ne pas se prévaloir de l’un quelconque de ses droits en vertu des CGU, ne pourra pas être interprété, quelles que soient la durée, l’importance ou la fréquence de cette tolérance, comme un abandon de son droit à faire observer ultérieurement, à tout moment, chacune des clauses et conditions des présentes. \n\n\n## ARTICLE 15 – INVALIDITE PARTIELLE \n\nLa nullité ou l’inapplicabilité de l’une quelconque des clauses et conditions des CGU, pour quelque motif que ce soit, n’affectera en rien la validité des autres clauses et conditions qui conserveront donc toute leur force et leur portée. \n\n\n## ARTICLE 16 – LOI APPLICABLE – RESOLUTION DES LITIGES\n\nLes CGU ainsi que les relations qu’elles régissent sont soumises à la loi française. \n\nEn cas de litige, CUISTOT DU COIN et l’Utilisateur chercheront une solution amiable avant toute action judiciaire. \n\nEn cas d'échec de ces tentatives, toutes contestations liées à la validité, l’interprétation et/ou l’exécution des CGU devront être portées : \n\n-\ts’agissant d’un Utilisateur particulier, devant les tribunaux compétents dans les conditions de droit commun. \n\n\n\n\nL’Utilisateur est par ailleurs informé qu’il peut en tout état de cause recourir à une médiation conventionnelle notamment auprès de la Commission de la médiation de la consommation ou auprès des instances de médiation sectorielles existantes, ou à tout mode alternatif de règlement des différends (conciliation, par exemple) en cas de contestation. \n\n-\tS’agissant d’un Utilisateur professionnel, exclusivement devant les tribunaux de Brest, même en cas de référé, d’appel en garantie, de pluralité d’instances ou de parties, ou de demande incidente.\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/content/testimony.md":
/*!************************************************************!*\
  !*** ./node_modules/raw-loader!./src/content/testimony.md ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/Document.tsx":
/*!**************************!*\
  !*** ./src/Document.tsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Document; });
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jaredpalmer/after */ "@jaredpalmer/after");
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! serialize-javascript */ "serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class Document extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
    static getInitialProps({ assets, data, renderPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield renderPage();
            return Object.assign({ assets,
                data }, page);
        });
    }
    render() {
        const { helmet, assets, data, initialApolloState, css } = this.props;
        // get attributes from React Helmet
        const htmlAttrs = helmet.htmlAttributes.toComponent();
        const bodyAttrs = helmet.bodyAttributes.toComponent();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("html", Object.assign({}, htmlAttrs, { lang: "fr", style: {
                height: "100vh"
            } }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("head", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { charSet: "utf-8" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { name: "theme-color", content: "#000000" }),
                assets.client.css && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "stylesheet", href: assets.client.css })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("style", { id: "jss-ssr" }, css),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "shortcut icon", href: "favicon/favicon.ico", type: "image/x-icon" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", href: "favicon/favicon.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "32x32", href: "favicon/favicon-32.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "64x64", href: "favicon/favicon-64.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "96x96", href: "favicon/favicon-96.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "96x96", href: "favicon/favicon-144.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "96x96", href: "favicon/favicon-196.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "shortcut icon", href: "favicon/favicon.ico", type: "image/x-icon" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "152x152", href: "favicon/apple-touch-icon.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "60x60", href: "favicon/apple-touch-icon-60x60.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "76x76", href: "favicon/apple-touch-icon-76x76.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "114x114", href: "favicon/apple-touch-icon-114x114.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "120x120", href: "favicon/apple-touch-icon-120x120.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "apple-touch-icon", sizes: "144x144", href: "favicon/apple-touch-icon-144x144.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", sizes: "196x196", href: "favicon/favicon-196.png", type: "image/png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { name: "msapplication-TileImage", content: "favicon/favicon-144.png" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { name: "msapplication-TileColor", content: "#FFFFFF" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", { rel: "icon", href: "favicon/animated_favicon.gif", type: "image/gif" }),
                helmet.title.toComponent(),
                helmet.meta.toComponent(),
                helmet.link.toComponent(),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `!function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-85934313-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)`
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `(function(a,l,b,c,r,s){_nQc=c,r=a.createElement(l),s=a.getElementsByTagName(l)[0];r.async=1;r.src=l.src=("https:"==a.location.protocol?"https://":"http://")+b;s.parentNode.insertBefore(r,s);})(document,"script","serve.albacross.com/track.js","89196477");`
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="9be7ee4d-531c-4885-90c7-2a190c06a0cc";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1669074413375602');fbq('track', 'PageView');`
                    } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("body", Object.assign({}, bodyAttrs, { style: {
                    minHeight: "100vh",
                    overflowX: "hidden"
                } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `window.env=${serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default()(_config__WEBPACK_IMPORTED_MODULE_3__["runtimeConfig"])};`
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `window.__APOLLO_STATE__=${JSON.stringify(initialApolloState).replace(/</g, "\\u003c")};`
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["AfterRoot"], null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["AfterData"], { data: data }),
                "development" === "production" && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { src: assets.client.js, defer: true })),
                "development" !== "production" && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", { src: assets.client.js, defer: true, crossOrigin: "anonymous" })))));
    }
}


/***/ }),

/***/ "./src/components/BookForm/BookForm.tsx":
/*!**********************************************!*\
  !*** ./src/components/BookForm/BookForm.tsx ***!
  \**********************************************/
/*! exports provided: BookForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookForm", function() { return BookForm; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "@material-ui/core/InputLabel");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik-material-ui */ "formik-material-ui");
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(formik_material_ui__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const styles = (theme) => ({
    formControl: {
        marginTop: theme.spacing.unit,
        width: "100%"
    },
    grid: {
        margin: "0px auto",
        maxWidth: 540,
        padding: 24
    },
    textField: {
        width: "100%"
    }
});
class BookForm extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        const onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
            try {
                // await Auth.signIn(values.email, values.password);
                alert("Logged in");
            }
            catch (e) {
                alert(e.message);
            }
        });
        const initialValues = {
            nbSeat: 1
        };
        const bookFormComponent = () => (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, { component: "p", gutterBottom: true },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("b", null, this.props.price),
                "\u20AC par personne"),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, { component: "p", gutterBottom: true },
                "Il reste ",
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("b", null, this.props.availableSeat),
                " places pour cet atelier"),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Form"], { autoComplete: "off" },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["FormControl"], { className: classes.formControl },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2___default.a, { htmlFor: "nbSeat" }, "Nombre d'invit\u00E9s"),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { component: formik_material_ui__WEBPACK_IMPORTED_MODULE_6__["Select"], name: "nbSeat", label: "Nombre d'invit\u00E9s", inputProps: {
                            id: "nbSeat",
                            name: "Nombre d'invités"
                        } }, [...Array(this.props.availableSeat)].map((e, i) => {
                        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["MenuItem"], { key: i + 1, value: i + 1 }, i + 1));
                    })),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { variant: "contained", color: "secondary", className: classes.button }, "R\u00E9server"),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, { variant: "caption", component: "p", align: "center" }, "Vous ne serez d\u00E9bit\u00E9 que si vous confirmez")))));
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], { initialValues: initialValues, component: bookFormComponent, onSubmit: onSubmit }));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(BookForm));


/***/ }),

/***/ "./src/components/BookForm/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/BookForm/index.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BookForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookForm */ "./src/components/BookForm/BookForm.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_BookForm__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Cover/Cover.tsx":
/*!****************************************!*\
  !*** ./src/components/Cover/Cover.tsx ***!
  \****************************************/
/*! exports provided: Cover, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cover", function() { return Cover; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const styles = (theme) => ({
    cover: {
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 400
    }
});
class Cover extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
    constructor() {
        super(...arguments);
        this.innerBackground = {
            backgroundImage: `url(${this.props.imageURL})`
        };
    }
    render() {
        const { classes } = this.props;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classes.cover, style: this.innerBackground });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Cover));


/***/ }),

/***/ "./src/components/Cover/index.tsx":
/*!****************************************!*\
  !*** ./src/components/Cover/index.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cover */ "./src/components/Cover/Cover.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Cover__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Footer/Footer.tsx":
/*!******************************************!*\
  !*** ./src/components/Footer/Footer.tsx ***!
  \******************************************/
/*! exports provided: Footer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/colors/grey */ "@material-ui/core/colors/grey");
/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);






const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    link: {
        textDecoration: "none"
    },
    root: {
        backgroundColor: _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_0___default.a[900]
    }
});
class Footer extends react__WEBPACK_IMPORTED_MODULE_4___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", { className: classes.root },
            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { component: "p", variant: "headline", color: "primary" }, "Cuistot du Coin"),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/team", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "L'\u00E9quipe")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/mission", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Notre mission")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/join", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Nous rejoindre")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/presskit", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Contact & Presse")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/terms", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Conditions l\u00E9gales")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", { className: classes.link, href: "http://www.blog.cuistotducoin.com", target: "_blank" },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Blog")))),
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { component: "p", variant: "headline", color: "primary" }, "Gourmets"),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/how-it-works#pour-les-gourmets", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Comment \u00E7a marche")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/testimony", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Temoignages")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/gift", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Offrir")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/invite", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Parrainage")))),
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { component: "p", variant: "headline", color: "primary" }, "Cuistots"),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/how-it-works#pour-les-cuistots", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Comment \u00E7a marche")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/testimony", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Temoignages")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/organize", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Devenir Cuistot")))),
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { component: "p", variant: "headline", color: "primary" }, "Entreprises"),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/how-it-works#pour-les-entreprises", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Comment \u00E7a marche")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/testimony", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Temoignages")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/invite-business", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Parrainage")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/terms-pro", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Conditions l\u00E9gales")))),
                react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { item: true },
                    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { component: "p", variant: "headline", color: "primary" }, "Partenaires"),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/how-it-works#pour-les-partenaires", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Comment \u00E7a marche")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/testimony", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Temoignages")),
                        react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/invite-business", className: classes.link },
                            react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary" }, "Devenir partenaires")))))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Footer));


/***/ }),

/***/ "./src/components/Footer/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Footer/index.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer/Footer.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Footer__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Head/Head.tsx":
/*!**************************************!*\
  !*** ./src/components/Head/Head.tsx ***!
  \**************************************/
/*! exports provided: Head, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Head", function() { return Head; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);


class Head extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        const { title, description, image, children, href } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1___default.a, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, title),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", { rel: "canonical", href: href }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:title", content: title }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:title", content: title }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:image", content: image ? image : "favicon/apple-touch-icon-114x114.png" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:image", content: image ? image : "favicon/apple-touch-icon-114x114.png" }),
            children));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Head);


/***/ }),

/***/ "./src/components/Head/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Head/index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Head */ "./src/components/Head/Head.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Head__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Header/Header.tsx":
/*!******************************************!*\
  !*** ./src/components/Header/Header.tsx ***!
  \******************************************/
/*! exports provided: Header, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);








const styles = (theme) => ({
    appBar: {
        background: "linear-gradient(180deg,hsla(0,0%,100%,.9) 0,hsla(0,0%,100%,.8))"
    },
    button: {
        margin: theme.spacing.unit
    }
});
class Header extends react__WEBPACK_IMPORTED_MODULE_6___default.a.Component {
    constructor(props) {
        super(props);
        this.handleScroll = (evt) => {
            if (window.scrollY > 0) {
                this.setState({ up: false });
            }
            else {
                this.setState({ up: true });
            }
        };
        this.state = {
            up: true
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        const { classes, hideSignUpLogin } = this.props;
        const businessLink = (props) => react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], Object.assign({ to: "/business" }, props));
        const individualLink = (props) => react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], Object.assign({ to: "/individual" }, props));
        const signUp = (props) => react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], Object.assign({ to: "/signup" }, props));
        const login = (props) => react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], Object.assign({ to: "/login" }, props));
        const button = this.state.up ? (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.button, component: login, variant: "raised", color: "primary", onScroll: this.handleScroll }, "Se connecter")) : (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.button, component: signUp, variant: "raised", color: "primary", onScroll: this.handleScroll }, "S'inscrire"));
        return (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_0___default.a, { position: this.props.static ? "static" : "sticky", className: classes.appBar },
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_5___default.a, null,
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, justify: "flex-start", alignItems: "center" },
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], { to: "/" },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/logo.svg", alt: "Logo de Cuistot du coin", height: 40, width: 40 })),
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_3___default.a, { smDown: true },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.button, component: businessLink, color: "primary" }, "Entreprise"),
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.button, component: individualLink, color: "primary" }, "Particulier"))),
                !hideSignUpLogin && // false is temp
                    false && (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, justify: "flex-end" }, button)))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(styles)(Header));


/***/ }),

/***/ "./src/components/Header/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Header/index.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ "./src/components/Header/Header.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Header__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Hero/Hero.tsx":
/*!**************************************!*\
  !*** ./src/components/Hero/Hero.tsx ***!
  \**************************************/
/*! exports provided: Hero, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return Hero; });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({
    backgroundImage: {
        bottom: 0,
        left: "50%",
        minHeight: "100%",
        minWidth: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        transform: "translateX(-50%);",
        zIndex: -1
    },
    content: {
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex"
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    home: {
        color: "#fff",
        overflow: "hidden",
        position: "relative"
    },
    video: {
        bottom: 0,
        left: "50%",
        minHeight: "100%",
        minWidth: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        transform: "translate(-50%, -25%);",
        zIndex: -1
    }
});
class Hero extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    constructor() {
        super(...arguments);
        this.innerBackground = {
            backgroundImage: `url(${this.props.imageURL})`
        };
        this.innerHeight = {
            height: this.props.height
        };
    }
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: classes.home },
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: classes.content, style: this.innerHeight },
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, direction: "column" },
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "title", align: "center", component: "h1", color: "inherit" }, this.props.valueProposition),
                        this.props.description && (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "subheading", align: "center", component: "p", color: "inherit" }, this.props.description))))),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: classes.backgroundImage, style: this.innerBackground }),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("video", { className: classes.video, autoPlay: true, muted: true, loop: true, poster: this.props.imageURL },
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("source", { src: this.props.videoURL, type: "video/mp4" }))));
    }
}
Hero.defaultProps = {
    height: 400,
    valueProposition: "Des saveurs à partager"
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(Hero));


/***/ }),

/***/ "./src/components/Hero/index.tsx":
/*!***************************************!*\
  !*** ./src/components/Hero/index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Hero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hero */ "./src/components/Hero/Hero.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Hero__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/Loading/Loading.tsx":
/*!********************************************!*\
  !*** ./src/components/Loading/Loading.tsx ***!
  \********************************************/
/*! exports provided: Hero, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return Hero; });
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "@material-ui/core/CircularProgress");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const styles = (theme) => ({
    loading: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
});
class Hero extends react__WEBPACK_IMPORTED_MODULE_2___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: classes.loading },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_0___default.a, null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(Hero));


/***/ }),

/***/ "./src/components/Loading/index.tsx":
/*!******************************************!*\
  !*** ./src/components/Loading/index.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loading */ "./src/components/Loading/Loading.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Loading__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/LoginForm/LoginForm.tsx":
/*!************************************************!*\
  !*** ./src/components/LoginForm/LoginForm.tsx ***!
  \************************************************/
/*! exports provided: LoginForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginForm", function() { return LoginForm; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik-material-ui */ "formik-material-ui");
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(formik_material_ui__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! yup */ "yup");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_8__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





// import { Auth } from "aws-amplify";

// @ts-ignore



const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 540,
        padding: 24
    },
    textField: {
        width: "100%"
    }
});
class LoginForm extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        const validationSchema = yup__WEBPACK_IMPORTED_MODULE_8__["object"]().shape({
            email: yup__WEBPACK_IMPORTED_MODULE_8__["string"]()
                .email("Veuillez saisir votre adresse email au bon format")
                .required("L'email est obligatoire"),
            password: yup__WEBPACK_IMPORTED_MODULE_8__["string"]()
                .min(8, "Votre mot de passe contient 8 charactères avec minuscules, majuscules et chiffres")
                .matches(/[a-z]/, "Votre mot de passe contient une minuscule")
                .matches(/[A-Z]/, "Votre mot de passe contient une majuscule")
                .matches(/[0-9]/, "Votre mot de passe contient un chiffre")
                .required("Le mot de passe est obligatoire")
        });
        const onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
            try {
                // await Auth.signIn(values.email, values.password);
                alert("Logged in");
            }
            catch (e) {
                alert(e.message);
            }
        });
        const initialValues = {
            email: "",
            password: ""
        };
        const loginFormComponent = () => (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Form"], { autoComplete: "off" },
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["FormControl"], null,
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, className: classes.grid, spacing: 16 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "center" },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { variant: "outlined", color: "secondary" }, "Se connecter avec Facebook"))),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_2___default.a, null)),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { type: "text", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_6__["TextField"], id: "email", label: "Email", name: "email", placeholder: "Votre email", className: classes.textField, margin: "normal" }))),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { type: "password", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_6__["TextField"], id: "password", label: "Mot de passe", name: "password", placeholder: "Votre mot de passe", className: classes.textField, margin: "normal" }))),
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "center" },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { variant: "contained", color: "secondary" }, "Se connecter")))))));
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], { initialValues: initialValues, component: loginFormComponent, onSubmit: onSubmit, validationSchema: validationSchema }));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(styles)(LoginForm));


/***/ }),

/***/ "./src/components/LoginForm/index.tsx":
/*!********************************************!*\
  !*** ./src/components/LoginForm/index.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginForm */ "./src/components/LoginForm/LoginForm.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_LoginForm__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/SignUpForm/SignUpForm.tsx":
/*!**************************************************!*\
  !*** ./src/components/SignUpForm/SignUpForm.tsx ***!
  \**************************************************/
/*! exports provided: SignUpForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpForm", function() { return SignUpForm; });
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik-material-ui */ "formik-material-ui");
/* harmony import */ var formik_material_ui__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(formik_material_ui__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! yup */ "yup");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_7__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




// import { Auth } from "aws-amplify";

// @ts-ignore



const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 540,
        padding: 24
    },
    textField: {
        width: "100%"
    }
});
class SignUpForm extends react__WEBPACK_IMPORTED_MODULE_6___default.a.Component {
    render() {
        const { classes } = this.props;
        const validationSchema = yup__WEBPACK_IMPORTED_MODULE_7__["object"]().shape({
            email: yup__WEBPACK_IMPORTED_MODULE_7__["string"]()
                .email("Veuillez saisir votre adresse email au bon format")
                .required("L'email est obligatoire"),
            firstname: yup__WEBPACK_IMPORTED_MODULE_7__["string"]().required("Le prénom est obligatoire"),
            lastname: yup__WEBPACK_IMPORTED_MODULE_7__["string"]().required("Le nom est obligatoire"),
            password: yup__WEBPACK_IMPORTED_MODULE_7__["string"]()
                .min(8, "Votre mot de passe doit contenir 8 charactères avec minuscules, majuscules et chiffres")
                .matches(/[a-z]/, "Votre mot de passe doit contenir une minuscule")
                .matches(/[A-Z]/, "Votre mot de passe doit contenir une majuscule")
                .matches(/[0-9]/, "Votre mot de passe doit contenir un chiffre")
                .required("Le mot de passe est obligatoire")
        });
        const onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
            try {
                alert("Sign up");
            }
            catch (e) {
                alert(e.message);
            }
        });
        const initialValues = {
            email: "",
            firstname: "",
            lastname: "",
            password: ""
        };
        const signUpFormComponent = () => (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Form"], { autoComplete: "off" },
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, className: classes.grid, spacing: 16 },
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_0___default.a, { variant: "outlined", color: "secondary" }, "S'inscrire avec Facebook"))),
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_1___default.a, null)),
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, spacing: 16 },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 6 },
                            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { id: "firstname", name: "firstname", label: "Pr\u00E9nom", placeholder: "Votre pr\u00E9nom", className: classes.textField, margin: "normal", type: "text", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_5__["TextField"] })),
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 6 },
                            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { id: "lastname", name: "lastname", label: "Nom", placeholder: "Votre nom", className: classes.textField, margin: "normal", type: "text", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_5__["TextField"] }))),
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true },
                            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { type: "text", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_5__["TextField"], id: "email", label: "Email", name: "email", placeholder: "Votre email", className: classes.textField, margin: "normal" }))),
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true },
                            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { type: "text", component: formik_material_ui__WEBPACK_IMPORTED_MODULE_5__["TextField"], id: "password", label: "Mot de passe", name: "password", placeholder: "Votre mot de passe", className: classes.textField, margin: "normal" })))),
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_0___default.a, { variant: "contained", color: "secondary" }, "S'inscrire"))))));
        return (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Formik"], { initialValues: initialValues, component: signUpFormComponent, onSubmit: onSubmit, validationSchema: validationSchema }));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(SignUpForm));


/***/ }),

/***/ "./src/components/SignUpForm/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/SignUpForm/index.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignUpForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignUpForm */ "./src/components/SignUpForm/SignUpForm.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_SignUpForm__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/StarRating/StarRating.tsx":
/*!**************************************************!*\
  !*** ./src/components/StarRating/StarRating.tsx ***!
  \**************************************************/
/*! exports provided: StarRating, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarRating", function() { return StarRating; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/icons/Star */ "@material-ui/icons/Star");
/* harmony import */ var _material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_icons_StarBorder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/StarBorder */ "@material-ui/icons/StarBorder");
/* harmony import */ var _material_ui_icons_StarBorder__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_StarBorder__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_StarHalf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/StarHalf */ "@material-ui/icons/StarHalf");
/* harmony import */ var _material_ui_icons_StarHalf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_StarHalf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





const styles = (theme) => ({});
class StarRating extends react__WEBPACK_IMPORTED_MODULE_4___default.a.Component {
    render() {
        const maxRating = Array(5).fill(null);
        const arrayStar = maxRating.map((el, idx) => {
            if (this.props.rating > idx) {
                if (this.props.rating > idx + 0.5) {
                    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Star__WEBPACK_IMPORTED_MODULE_1___default.a, { color: "primary", key: idx });
                }
                return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_StarHalf__WEBPACK_IMPORTED_MODULE_3___default.a, { color: "primary", key: idx });
            }
            return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_StarBorder__WEBPACK_IMPORTED_MODULE_2___default.a, { color: "primary", key: idx });
        });
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null, arrayStar);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(StarRating));


/***/ }),

/***/ "./src/components/StarRating/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/StarRating/index.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StarRating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StarRating */ "./src/components/StarRating/StarRating.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_StarRating__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/WorkshopCard/WorkshopCard.tsx":
/*!******************************************************!*\
  !*** ./src/components/WorkshopCard/WorkshopCard.tsx ***!
  \******************************************************/
/*! exports provided: WorkshopCard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkshopCard", function() { return WorkshopCard; });
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardHeader */ "@material-ui/core/CardHeader");
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/colors/green */ "@material-ui/core/colors/green");
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_Face__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Face */ "@material-ui/icons/Face");
/* harmony import */ var _material_ui_icons_Face__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Face__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_HourglassFull__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/HourglassFull */ "@material-ui/icons/HourglassFull");
/* harmony import */ var _material_ui_icons_HourglassFull__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_HourglassFull__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Place */ "@material-ui/icons/Place");
/* harmony import */ var _material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _StarRating__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../StarRating */ "./src/components/StarRating/index.tsx");
















const styles = (theme) => ({
    avatar: {
        backgroundColor: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_6___default.a[500],
        border: "4px solid white",
        height: 60,
        width: 60
    },
    bottomContentCard: {
        marginTop: -40
    },
    bottomContentCardItem: {
        padding: 4
    },
    card: {
        width: 360
    },
    cardContent: {
        "&:last-child": { padding: 0 },
        marginTop: -25,
        padding: 0
    },
    cardHeaderUp: {
        alignItems: "flex-end",
        flexDirection: "row-reverse",
        marginBottom: -64
    },
    chip: {
        marginRight: 0
    },
    icon: {
        color: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_6___default.a[900],
        height: 15
    },
    link: {
        textDecoration: "none"
    },
    media: {
        height: 194
    },
    nameCook: {
        color: "white",
        marginTop: 5,
        textShadow: "1px 1px #585A5A"
    },
    ratingNumber: {
        color: "white",
        textShadow: "1px 1px #585A5A"
    }
});
class WorkshopCard extends react__WEBPACK_IMPORTED_MODULE_14___default.a.Component {
    render() {
        const { classes } = this.props;
        let avatar;
        if (this.props.imageCook) {
            avatar = (react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.avatar, alt: this.props.nameCook, src: this.props.imageCook }));
        }
        else {
            avatar = (react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.avatar }, this.props.nameCook.charAt(0)));
        }
        return (react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("a", { className: classes.link, href: this.props.typeform, target: "_blank" },
            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.card },
                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_3___default.a, { className: classes.cardHeaderUp, avatar: react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_5___default.a, { label: this.props.price + "€" }), classes: { avatar: classes.chip } }),
                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_4___default.a, { className: classes.media, image: this.props.image, title: this.props.name }),
                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2___default.a, { className: classes.cardContent },
                    react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true, justify: "space-between" },
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true }, avatar),
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true },
                                    react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { className: classes.nameCook, variant: "body1" },
                                        "Rencontrez ",
                                        this.props.nameCook)))),
                        this.props.rating && (react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true, justify: "flex-end" },
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_StarRating__WEBPACK_IMPORTED_MODULE_15__["default"], { rating: this.props.rating }),
                                this.props.ratingNumber && (react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { variant: "caption", className: classes.ratingNumber },
                                    "(",
                                    this.props.ratingNumber,
                                    ")")))))),
                    react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true, alignItems: "center", direction: "column", className: classes.bottomContentCard },
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true, className: classes.bottomContentCardItem },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_5___default.a, { label: "Atelier collectif", className: classes.chip })),
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true, className: classes.bottomContentCardItem },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { align: "center", variant: "title" }, this.props.name)),
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true, className: classes.bottomContentCardItem },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { variant: "subheading" }, this.props.date))),
                    react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7___default.a, null),
                    react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true },
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true, xs: 6 },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true, justify: "center" },
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13___default.a, { className: classes.icon }),
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { variant: "caption" }, this.props.spot))),
                        react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { item: true, xs: 6 },
                            react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, { container: true, justify: "center" },
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_icons_HourglassFull__WEBPACK_IMPORTED_MODULE_12___default.a, { className: classes.icon }),
                                react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, { variant: "caption" },
                                    this.props.duration,
                                    "h"))))))));
    }
}
WorkshopCard.defaultProps = { avatar: react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_material_ui_icons_Face__WEBPACK_IMPORTED_MODULE_11___default.a, null) };
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["withStyles"])(styles)(WorkshopCard));


/***/ }),

/***/ "./src/components/WorkshopCard/index.tsx":
/*!***********************************************!*\
  !*** ./src/components/WorkshopCard/index.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WorkshopCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkshopCard */ "./src/components/WorkshopCard/WorkshopCard.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_WorkshopCard__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/WorkshopCardList/WorkshopCardList.tsx":
/*!**************************************************************!*\
  !*** ./src/components/WorkshopCardList/WorkshopCardList.tsx ***!
  \**************************************************************/
/*! exports provided: WorkshopCardList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkshopCardList", function() { return WorkshopCardList; });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _WorkshopCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WorkshopCard */ "./src/components/WorkshopCard/index.tsx");




const styles = (theme) => ({
    card: {
        padding: 10
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1300,
        paddingBottom: 24,
        paddingTop: 12
    }
});
class WorkshopCardList extends react__WEBPACK_IMPORTED_MODULE_2___default.a.Component {
    render() {
        const { classes, workshops } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-around", className: classes.grid }, workshops.map((workshop, index) => (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { key: index, item: true, xs: 12, md: 6, lg: 4 },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "center", className: classes.card },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_WorkshopCard__WEBPACK_IMPORTED_MODULE_3__["default"], Object.assign({}, workshop))))))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(WorkshopCardList));


/***/ }),

/***/ "./src/components/WorkshopCardList/index.tsx":
/*!***************************************************!*\
  !*** ./src/components/WorkshopCardList/index.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WorkshopCardList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkshopCardList */ "./src/components/WorkshopCardList/WorkshopCardList.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_WorkshopCardList__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: runtimeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runtimeConfig", function() { return runtimeConfig; });
const runtimeConfig = typeof window !== "undefined"
    ? {
        STRIPE_API: window.env.STRIPE_API,
        STRIPE_API_KEY: window.env.STRIPE_API_KEY
    }
    : {
        STRIPE_API: process.env.STRIPE_API,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY
    };


/***/ }),

/***/ "./src/createApolloClient.js":
/*!***********************************!*\
  !*** ./src/createApolloClient.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-client */ "apollo-client");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-link-http */ "apollo-link-http");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_link_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-cache-inmemory */ "apollo-cache-inmemory");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__);





function createApolloClient({ ssrMode }) {
  return new apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
    cache: ssrMode
      ? new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]()
      : new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]().restore(window.__APOLLO_STATE__),
    link: Object(apollo_link_http__WEBPACK_IMPORTED_MODULE_1__["createHttpLink"])({
      credentials: 'same-origin',
      fetch: (isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default()),
      uri: 'http://localhost:64895',
    }),
    ssrMode});
}

/* harmony default export */ __webpack_exports__["default"] = (createApolloClient);

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var aws_serverless_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-serverless-express */ "aws-serverless-express");
/* harmony import */ var aws_serverless_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_serverless_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! server */ "./src/server.tsx");



let lambdaOrServer;
if (process.env.EXECUTION_ENV === "lambda") {
    console.log("Lambda 🚀 started");
    const binaryMimeTypes = ["*/*"];
    const server = aws_serverless_express__WEBPACK_IMPORTED_MODULE_0__["createServer"](server__WEBPACK_IMPORTED_MODULE_2__["default"], undefined, binaryMimeTypes);
    lambdaOrServer = (event, context) => aws_serverless_express__WEBPACK_IMPORTED_MODULE_0__["proxy"](server, event, context);
}
else {
    if (true) {
        module.hot.accept(/*! ./server */ "./src/server.tsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server */ "./src/server.tsx");
(() => {
            console.log("🔁  HMR Reloading `./server`...");
        })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
        console.info("✅  Server-side HMR Enabled!");
    }
    const port = "3000" || 3000;
    lambdaOrServer = express__WEBPACK_IMPORTED_MODULE_1___default()()
        .use(server__WEBPACK_IMPORTED_MODULE_2__["default"])
        .listen(port, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`🚀 Started on port ${port}`);
    });
}
const handler = lambdaOrServer;


/***/ }),

/***/ "./src/pages/Business/Business.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Business/Business.tsx ***!
  \*****************************************/
/*! exports provided: Business, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Business", function() { return Business; });
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardHeader */ "@material-ui/core/CardHeader");
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid/Grid */ "@material-ui/core/Grid/Grid");
/* harmony import */ var _material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_hubspot_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-hubspot-form */ "react-hubspot-form");
/* harmony import */ var react_hubspot_form__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_hubspot_form__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-slick */ "react-slick");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");












// @ts-ignore



const styles = (theme) => ({
    card: {
        width: 300
    },
    cardHeader: {
        background: "rgba(0, 0, 0, 0.4)",
        color: "fff",
        height: 40,
        marginTop: -72
    },
    cardLongContent: {
        height: 120
    },
    cardShortContent: {
        height: 60
    },
    cardtypeWorld: {
        width: 240
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    image: {
        height: "100%",
        maxWidth: 320,
        width: "100%"
    },
    logo: {
        height: "100%",
        maxWidth: 50,
        width: "100%"
    },
    media: {
        height: 135
    },
    slider: {
        margin: "0px auto",
        maxWidth: 1080,
        paddingBottom: 75,
        width: "calc(100% - 120px)"
    },
    sliderImage: {
        height: 100,
        margin: "0px auto",
        width: 100
    },
    title: { color: "white" }
});
class Business extends react__WEBPACK_IMPORTED_MODULE_11___default.a.Component {
    render() {
        const { classes } = this.props;
        const sliderSettings = {
            autoplay: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ],
            slidesToScroll: 1,
            slidesToShow: 4
        };
        const typeActivity = [
            {
                description: "Atelier de deux heures suivi d'une dégustation des produits préparés",
                image: "https://static.cuistotducoin.com/img/business/atelier-afterwork.jpg",
                title: "Atelier Afterwork"
            },
            {
                description: "Atelier de trois heures suivi d'un repas convivial",
                image: "https://static.cuistotducoin.com/img/business/atelier-et-repas.jpg",
                title: "Atelier suivi d’un repas"
            },
            {
                description: "Atelier découverte et dégustation",
                image: "https://static.cuistotducoin.com/img/business/degustation.jpg",
                title: "Atelier dégustation"
            },
            {
                description: "Une solution clé en main pour un dejeunez rapide",
                image: "https://static.cuistotducoin.com/img/business/buffet.jpg",
                title: "Buffet"
            },
            {
                description: "Récompensez vos équipes autour d'un repas d'exception !",
                image: "https://static.cuistotducoin.com/img/business/repas-prestige.jpg",
                title: "Repas prestige"
            },
            {
                description: "Notre cuistot est aux fourneaux et vous prépare des mets du monde à se partager en équipe.",
                image: "https://static.cuistotducoin.com/img/business/repas-pratique.jpg",
                title: "Repas pratique"
            }
        ];
        const typeWorld = [
            {
                description: "Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots d'ailleurs.",
                image: "https://static.cuistotducoin.com/img/business/cuisine-du-monde.jpg",
                title: "Cuisine du monde"
            },
            {
                description: "Initiez-vous aux principes de la cuisine végétarienne, vegan ou encore ayurvédique, où l’équilibre et les saveurs sont au cœur de l’assiette.",
                image: "https://static.cuistotducoin.com/img/business/cuisine-bien-etre.jpg",
                title: "Cuisine Bien-être"
            },
            {
                description: "Attachés à votre territoire et aux produits locaux et de saison, plongez au cœur d’une cuisine bretonne qui éveillera votre curiosité.",
                image: "https://static.cuistotducoin.com/img/business/cuisine-terroir.jpg",
                title: "Cuisine Terroir"
            },
            {
                description: "Percez les secrets de nos artisans pâtissiers et boulangers au travers de recettes créatives et gourmandes.",
                image: "https://static.cuistotducoin.com/img/business/boulangerie-et-patisserie.jpg",
                title: "Boulangerie & Pâtisserie"
            }
        ];
        const participants = [
            {
                image: "https://static.cuistotducoin.com/img/business/participants/arkea.jpg",
                name: "arkea"
            },
            {
                image: "https://static.cuistotducoin.com/img/business/participants/brest-metropole.jpg",
                name: "brest metropole et ville"
            },
            {
                image: "https://static.cuistotducoin.com/img/business/participants/cadiou.jpg",
                name: "cadiou"
            },
            {
                image: "https://static.cuistotducoin.com/img/business/participants/fortuneo.jpg",
                name: "fortuneo"
            },
            {
                image: "https://static.cuistotducoin.com/img/business/participants/gl-events.jpg",
                name: "gl events"
            },
            {
                image: "https://static.cuistotducoin.com/img/business/participants/hippocampe.jpg",
                name: "hippocampe"
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_11___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_8__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_14__["default"].metaInfo.business.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_14__["default"].metaInfo.business.description }),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_9__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_10__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Concoctez avec nous une exp\u00E9rience culinaire authentique et gourmande pour vos salari\u00E9s !", description: "Ateliers de Cuisine, D\u00E9gustations, Repas authentiques et conviviaux" }),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", className: classes.grid, spacing: 16 },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, sm: 6, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("img", { className: classes.image, alt: "Atelier Cuistot du Coin", src: "https://static.cuistotducoin.com/img/business/organisez.jpg" }))),
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, sm: 6, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "Organisez avec nous des ateliers culinaires pour vos \u00E9quipes"),
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1", align: "center" }, "Enfilez le tablier et partagez des moments privil\u00E9gi\u00E9s et f\u00E9d\u00E9rateurs en \u00E9quipe aux c\u00F4t\u00E9s de nos Cuistots passionn\u00E9s aux univers culinaires diversifi\u00E9s"))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", className: classes.grid, spacing: 16 },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, sm: 6, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "Passez \u00E0 table, r\u00E9galez-vous ! Nos Cuistots s\u2019occupent de tout !"),
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1", align: "center" }, "D\u00E9couverte de saveurs et partage s\u2019invitent au c\u0153ur de vos repas concoct\u00E9s par nos Cuistots. Partez \u00E0 leur rencontre et laissez-vous porter le temps d\u2019un voyage gustatif autour de leurs plats \u00ABfait-maison\u00BB.")),
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, sm: 6, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("img", { className: classes.image, alt: "Atelier Cuistot du Coin", src: "https://static.cuistotducoin.com/img/business/passez-a-table.jpg" })))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "Plut\u00F4t atelier de cuisine ou repas ? Il y en a pour tous les go\u00FBts !"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid }, typeActivity.map((activity, index) => (react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { key: index, item: true, xs: 12, sm: 6, md: 4 },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.card },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3___default.a, { className: classes.media, image: activity.image, title: activity.title }),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2___default.a, { className: classes.cardHeader, title: activity.title, classes: {
                                title: classes.title
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.cardShortContent },
                            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { component: "p" }, activity.description)))))))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "Notre recette ?"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "subheading" }, "A votre \u00E9coute"),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1" }, "Fa\u00EEtes-nous part de vos besoins et de vos envies."))),
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "subheading" }, "Une diversit\u00E9 de saveurs"),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1" }, "Nous s\u00E9lectionnons nos ateliers et nos repas les mieux adapt\u00E9s et d\u00E9finissons ensemble leurs modalit\u00E9s."))),
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "subheading" }, "On s\u2019occupe de tout"),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1" }, "Repas et ateliers sont organis\u00E9s de A \u00E0 Z par nos soins. Enfilez le tablier ou passez \u00E0 table: il n\u2019y a plus qu\u2019\u00E0 d\u00E9guster!")))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "C\u2019est parti pour le voyage des papilles !"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1", paragraph: true }, "Passionn\u00E9s de cuisine, nos Cuistots ont \u00E0 c\u0153ur de partager leurs savoir-faire et leurs recettes authentiques, mais surtout de vous faire d\u00E9couvrir leurs univers ! Ils vous invitent \u00E0 vivre une exp\u00E9rience culinaire in\u00E9dite au sein de votre entreprise ou dans l\u2019un de nos lieux partenaires le temps d\u2019un atelier culinaire ou d\u2019un repas savoureux")),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "p", gutterBottom: true }, "A vous de choisir votre destination !"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid }, typeWorld.map((world, index) => (react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { key: index, item: true, xs: 12, sm: 6, md: 3, lg: true },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "center" },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.cardtypeWorld },
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3___default.a, { className: classes.media, image: world.image, title: world.title }),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2___default.a, { className: classes.cardHeader, title: world.title, classes: {
                                title: classes.title
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.cardLongContent },
                            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { component: "p" }, world.description)))))))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "p", gutterBottom: true }, "Ils ont voyag\u00E9 aux c\u00F4t\u00E9s de nos Cuistots"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1" }, "Ils ont participez \u00E0 nos ateliers, d\u00E9jeunez aux cot\u00E9s de nos Cuistots, pour renforcez les liens de leurs salari\u00E9s, r\u00E9compensez la r\u00E9ussite d'un projet ou encore pour acceuillir leurs partenaires ou clients."))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", { className: classes.slider },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_13___default.a, Object.assign({}, sliderSettings), participants.map((participant, index) => (react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", { key: index },
                    react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("img", { src: participant.image, alt: participant.name, className: classes.sliderImage })))))),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "p", gutterBottom: true }, "R\u00E9servez votre billet et embarquez en \u00E9quipe pour un savoureux voyage culinaire !"),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core_Grid_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react_hubspot_form__WEBPACK_IMPORTED_MODULE_12___default.a, { portalId: "3826127", formId: "2db2fd4a-3e67-4396-a725-e8320947201e" })),
            react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles)(Business));


/***/ }),

/***/ "./src/pages/Cook/Cook.tsx":
/*!*********************************!*\
  !*** ./src/pages/Cook/Cook.tsx ***!
  \*********************************/
/*! exports provided: Cook, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cook", function() { return Cook; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({});
class Cook extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Cook));


/***/ }),

/***/ "./src/pages/Cook/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Cook/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cook */ "./src/pages/Cook/Cook.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Cook__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Gift/Gift.tsx":
/*!*********************************!*\
  !*** ./src/pages/Gift/Gift.tsx ***!
  \*********************************/
/*! exports provided: Gift, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gift", function() { return Gift; });
/* harmony import */ var _raw_loader_content_gift_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/gift.md */ "./node_modules/raw-loader/index.js!./src/content/gift.md");
/* harmony import */ var _raw_loader_content_gift_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_gift_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Gift extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.gift.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.gift.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Concoctez avec nous une exp\u00E9rience culinaire authentique et gourmande pour vos salari\u00E9s !" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_gift_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Gift));


/***/ }),

/***/ "./src/pages/Gift/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Gift/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Gift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gift */ "./src/pages/Gift/Gift.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Gift__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/GroupLesson/GroupLesson.tsx":
/*!***********************************************!*\
  !*** ./src/pages/GroupLesson/GroupLesson.tsx ***!
  \***********************************************/
/*! exports provided: Business, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Business", function() { return Business; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({
    card: {
        maxWidth: 240
    },
    cardHeader: {
        background: "rgba(0, 0, 0, 0.4)",
        color: "fff",
        height: 40,
        marginTop: -72
    },
    cardLongContent: {
        height: 120
    },
    cardShortContent: {
        height: 80
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    image: {
        height: "100%",
        maxWidth: 320,
        width: "100%"
    },
    logo: {
        height: "100%",
        maxWidth: 50,
        width: "100%"
    },
    media: {
        height: 135
    },
    title: { color: "white" }
});
class Business extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    render() {
        const { classes } = this.props;
        const typeActivity = [
            {
                description: "Atelier de deux heures suivi d'une dégustation des produits préparés",
                image: "https://picsum.photos/240/135/?random",
                title: "Atelier Afterwork"
            },
            {
                description: "Atelier de quatre heures suivi d'un repas convivial",
                image: "https://picsum.photos/240/135/?random",
                title: "Atelier suivi d’un repas"
            },
            {
                description: "Atelier découverte et dégustation",
                image: "https://picsum.photos/240/135/?random",
                title: "Atelier dégustation"
            },
            {
                description: "Récompensez vos équipes autour d'un repas d'exception !",
                image: "https://picsum.photos/240/135/?random",
                title: "Repas prestige"
            },
            {
                description: "Notre cuistot est aux founeaux pour changer de l'habituel traiteur : rapidité et simplicité",
                image: "https://picsum.photos/240/135/?random",
                title: "Repas pratique"
            }
        ];
        const typeWorld = [
            {
                description: "Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots d'ailleurs.",
                image: "https://picsum.photos/240/135/?random",
                title: "Cuisine du monde"
            },
            {
                description: "Initiez-vous aux principes de la cuisine végétarienne, vegan ou encore ayurvédique, où l’équilibre et les saveurs sont au cœur de l’assiette.",
                image: "https://picsum.photos/240/135/?random",
                title: "Cuisine Bien-être"
            },
            {
                description: "Attachés à votre territoire et aux produits locaux et de saison, plongez au cœur d’une cuisine bretonne qui éveillera votre curiosité.",
                image: "https://picsum.photos/240/135/?random",
                title: "Cuisine Terroir"
            },
            {
                description: "Percez les secrets de nos artisans pâtissiers et boulangers au travers de recettes créatives et gourmandes.",
                image: "https://picsum.photos/240/135/?random",
                title: "Boulangerie & Pâtisserie"
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Business));


/***/ }),

/***/ "./src/pages/GroupLesson/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/GroupLesson/index.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupLesson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupLesson */ "./src/pages/GroupLesson/GroupLesson.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_GroupLesson__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Home/Home.tsx":
/*!*********************************!*\
  !*** ./src/pages/Home/Home.tsx ***!
  \*********************************/
/*! exports provided: Home, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-slick */ "react-slick");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");











const styles = (theme) => ({
    block: {
        height: "100%",
        overflow: "hidden",
        position: "relative"
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    gridTile: {
        margin: "0px auto"
    },
    image: {
        opacity: "0.5",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%"
    },
    link: {
        textDecoration: "none"
    },
    slider: {
        margin: "0px auto",
        maxWidth: 950,
        paddingBottom: 75,
        width: "calc(100% - 120px)"
    },
    sliderImage: {
        height: 100,
        margin: "0px auto",
        width: 100
    },
    tile: {
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        height: "100%",
        left: 0,
        position: "absolute",
        right: 0,
        textAlign: "center",
        top: 0
    },
    tileEntreprise: {
        "&:hover": {
            opacity: 0.9
        },
        "&:hover $tileSubtitle": {
            opacity: 1
        },
        backgroundColor: "#e84a4c",
        height: 180
    },
    tileParticulier: {
        "&:hover": {
            opacity: 0.9
        },
        "&:hover $tileSubtitle": {
            opacity: 1
        },
        backgroundColor: "#47b8b2",
        height: 180
    },
    tileSubtitle: {
        color: "#fff",
        opacity: 0,
        textAlign: "center",
        transition: "opacity 0.35s, transform 0.35s"
    },
    tileTitle: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center"
    },
    typography: {
        marginTop: 15
    }
});
class Home extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        const sliderSettings = {
            autoplay: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ],
            slidesToScroll: 1,
            slidesToShow: 4
        };
        const partners = [
            {
                image: "https://static.cuistotducoin.com/img/home/partners/amaiur.jpg",
                name: "amaiur"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/arthur-bonnet.jpg",
                name: "Arthur Bonnet"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/c-chocolat.jpg",
                name: "C chocolat"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/couleurs-cuisines.jpg",
                name: "Couleurs Cuisines"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/cuisinella.jpg",
                name: "cuisinella"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/palais-des-thes.jpg",
                name: "Palais des thes"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/roi-de-bretagne.jpg",
                name: "Roi de Bretagne"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/schmidt.jpg",
                name: "Schmidt"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/soif-de-vins.jpg",
                name: "Soif de vins"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/the-corner.jpg",
                name: "The corner"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/tot-ou-tard.jpg",
                name: "Tot ou tard"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/partners/tuk-tuk-bazar.jpg",
                name: "Tuk Tuk Bazar"
            }
        ];
        const participants = [
            {
                image: "https://static.cuistotducoin.com/img/home/participants/arkea.jpg",
                name: "arkea"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/participants/brest-metropole.jpg",
                name: "brest metropole et ville"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/participants/cadiou.jpg",
                name: "cadiou"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/participants/fortuneo.jpg",
                name: "fortuneo"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/participants/gl-events.jpg",
                name: "gl events"
            },
            {
                image: "https://static.cuistotducoin.com/img/home/participants/hippocampe.jpg",
                name: "hippocampe"
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_4__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_10__["default"].metaInfo.home.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_10__["default"].metaInfo.home.description }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Fa\u00EEtes voyager vos papilles et ouvrez-vous \u00E0 de nouvelles cultures par le biais de la cuisine aux c\u00F4t\u00E9s de nos Cuistots", description: "Ateliers de Cuisine, D\u00E9gustations, Repas authentiques et conviviaux" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, alignItems: "center", className: classes.gridTile },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12, sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, className: classes.tileEntreprise },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { className: classes.block },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/home/business.jpg", alt: "Entreprise", className: classes.image }),
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], { to: "/business", className: classes.link },
                                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { className: classes.tile },
                                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, direction: "column" },
                                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "headline", align: "center", component: "h2", className: classes.tileTitle }, "Vous \u00EAtes une entreprise"),
                                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body2", align: "center", component: "p", className: classes.tileSubtitle }, "Concoctez avec nous une exp\u00E9rience culinaire authentique et gourmande pour vos salari\u00E9s !"))))))),
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12, sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, className: classes.tileParticulier },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { className: classes.block },
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/home/individual.jpg", alt: "Particulier", className: classes.image }),
                            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], { to: "/individual", className: classes.link },
                                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { className: classes.tile },
                                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, direction: "column" },
                                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "headline", align: "center", component: "h2", className: classes.tileTitle }, "Vous \u00EAtes un particulier"),
                                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body2", align: "center", component: "p", className: classes.tileSubtitle }, "Participez \u00E0 des ateliers de cuisine authentiques et en toute convivialit\u00E9 !")))))))),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "headline", align: "center", component: "h2", gutterBottom: true, className: classes.typography }, "Ateliers, d\u00E9gustations ou repas, retrouvez nos ingr\u00E9dients cl\u00E9s :"),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-around", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "title", component: "h3", gutterBottom: true }, "Authenticit\u00E9 et Convivialit\u00E9"),
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body1" }, "Parce que le voyage commence d\u2019abord dans l\u2019assiette, d\u00E9couvrez une cuisine qui invite \u00E0 l\u2019\u00E9vasion et percez les secrets des recettes de nos Cuistots passionn\u00E9s."))),
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "title", component: "h3", gutterBottom: true }, "Partage"),
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body1" }, "Au-del\u00E0 de la cuisine, plongez dans les univers de nos Cuistots et d\u00E9couvrez de nouveaux horizons."))),
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12, sm: 4 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-between", alignItems: "flex-start", direction: "column" },
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "title", component: "h3", gutterBottom: true }, "Diversit\u00E9"),
                        react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body1" }, "Divers formats et univers culinaires sont propos\u00E9s chez Cuistot du Coin. De quoi satisfaire vos papilles !")))),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true }, "Nos partenaires"),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { container: true, justify: "space-around", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, { item: true, xs: 12 },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, { variant: "body1" }, "Le talent culinaire est partout et Cuistot du Coin souhaite le r\u00E9v\u00E9ler. Nous nous sommes entour\u00E9s d\u2019artisans et de commer\u00E7ants passionn\u00E9s pour vous offrir des exp\u00E9riences culinaires sur-mesure."))),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { className: classes.slider },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_9___default.a, Object.assign({}, sliderSettings), partners.map(partner => (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", { key: partner.name },
                    react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("img", { src: partner.image, alt: partner.name, className: classes.sliderImage, key: partner.name })))))),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(Home));


/***/ }),

/***/ "./src/pages/Home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Home/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home */ "./src/pages/Home/Home.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Home__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/HowItWorks/HowItWorks.tsx":
/*!*********************************************!*\
  !*** ./src/pages/HowItWorks/HowItWorks.tsx ***!
  \*********************************************/
/*! exports provided: HowItWorks, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowItWorks", function() { return HowItWorks; });
/* harmony import */ var _raw_loader_content_howitworks_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/howitworks.md */ "./node_modules/raw-loader/index.js!./src/content/howitworks.md");
/* harmony import */ var _raw_loader_content_howitworks_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_howitworks_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class HowItWorks extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.howitworks.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.howitworks.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Comment \u00E7a marche ?" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_howitworks_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(HowItWorks));


/***/ }),

/***/ "./src/pages/HowItWorks/index.tsx":
/*!****************************************!*\
  !*** ./src/pages/HowItWorks/index.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HowItWorks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HowItWorks */ "./src/pages/HowItWorks/HowItWorks.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_HowItWorks__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Individual/Individual.tsx":
/*!*********************************************!*\
  !*** ./src/pages/Individual/Individual.tsx ***!
  \*********************************************/
/*! exports provided: Individual, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Individual", function() { return Individual; });
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardHeader */ "@material-ui/core/CardHeader");
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var components_WorkshopCardList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/WorkshopCardList */ "./src/components/WorkshopCardList/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");














const styles = (theme) => ({
    card: {
        width: 300
    },
    cardHeader: {
        background: "rgba(0, 0, 0, 0.4)",
        color: "fff",
        height: 40,
        marginTop: -72
    },
    cardShortContent: {
        height: 40
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    media: {
        height: 135
    },
    title: {
        color: "white"
    },
    typography: {
        marginTop: 15
    }
});
class Individual extends react__WEBPACK_IMPORTED_MODULE_12___default.a.Component {
    render() {
        const { classes } = this.props;
        const typeActivity = [
            {
                description: "Ateliers de cuisine collectif chez nos lieux partenaires",
                image: "https://static.cuistotducoin.com/img/individual/ateliers-cuisine-collectif.jpg",
                title: "Ateliers de cuisine collectif"
            },
            {
                description: "Ateliers de cuisine privatisé chez vous ou chez nos lieux partenaires",
                image: "https://static.cuistotducoin.com/img/individual/ateliers-cuisine-privatise.jpg",
                title: "Ateliers de cuisine privatisé"
            },
            {
                description: "Notre cuistot est aux fourneaux rien que pour vous et vos invités",
                image: "https://static.cuistotducoin.com/img/individual/cuistot-a-domicile.jpg",
                title: "Repas à domicile"
            }
        ];
        const workshops = [
            {
                availableSeat: 8,
                date: "samedi 4 aout, 14h30-16h30",
                duration: 2,
                image: "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
                name: "Tournage de crèpes de froment",
                nameCook: "Nadine",
                price: 20,
                spot: "Schmidt, Brest",
                totalSeat: 8,
                typeform: "https://cuistotducoin.typeform.com/to/WKmt7V"
            },
            {
                availableSeat: 6,
                date: "samedi 1 septembre, 10h-12h",
                duration: 2,
                image: "https://static.cuistotducoin.com/img/workshops/anaelle-sarrasin.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/anaelle.jpg",
                name: "À la découverte du sarrasin",
                nameCook: "Anaelle",
                price: 25,
                spot: "Anaelle, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/U3mOaj"
            },
            {
                availableSeat: 8,
                date: "samedi 22 septembre, 14h-18h",
                duration: 4,
                image: "https://static.cuistotducoin.com/img/workshops/fabien-viennoiseries.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
                name: "Viennoiseries : Croissants & Pains au chocolat",
                nameCook: "Fabien",
                price: 45,
                spot: "Arthur Bonnet, Brest",
                totalSeat: 8,
                typeform: "https://cuistotducoin.typeform.com/to/YDNdtB"
            },
            {
                availableSeat: 8,
                date: "samedi 22 septembre, 14h-18h",
                duration: 4,
                image: "https://static.cuistotducoin.com/img/workshops/fabien-pain-maison.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
                name: "Faire son pain maison",
                nameCook: "Fabien",
                price: 50,
                spot: "Schmidt, Brest",
                totalSeat: 8,
                typeform: "https://cuistotducoin.typeform.com/to/RpiaBS"
            },
            {
                availableSeat: 6,
                date: "samedi 20 octobre, 10h-12h",
                duration: 2,
                image: "https://static.cuistotducoin.com/img/workshops/ahmed-cacao-cru.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
                name: "Cacao cru",
                nameCook: "Ahmed",
                price: 25,
                spot: "Cuisinella, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/EWUT4t"
            },
            {
                availableSeat: 8,
                date: "samedi 27 octobre, 14h-18h",
                duration: 4,
                image: "https://static.cuistotducoin.com/img/workshops/fabien-pains-stop-au-gaspi.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
                name: "Recyclez son pain : stop au gaspi",
                nameCook: "Fabien",
                price: 45,
                spot: "Schmidt, Brest",
                totalSeat: 8,
                typeform: "https://cuistotducoin.typeform.com/to/Voq2Qo"
            },
            /*{
              availableSeat: 8,
              date: "samedi 24 novembre, 9h-13h",
              duration: 4,
              image:
                "https://static.cuistotducoin.com/img/workshops/fabien-pain-maison.jpg",
              imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
              name: "Faire son pain maison",
              nameCook: "Fabien",
              price: 50,
              spot: "Schmidt, Brest",
              totalSeat: 8,
              typeform: "https://cuistotducoin.typeform.com/to/RpiaBS"
            },*/
            {
                availableSeat: 6,
                date: "samedi 24 novembre, 9h-12h",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/ahmed-entre-ici-et-ailleurs.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
                name: "Entre ici et ailleurs",
                nameCook: "Ahmed",
                price: 35,
                spot: "Cuisinella, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/sETMyV"
            }
        ];
        const workshopsPending = [
            {
                availableSeat: 6,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/shyam-indien-generique.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/shyam.jpg",
                name: "Découverte de la cuisine indienne",
                nameCook: "Shyam",
                price: 35,
                spot: "Arthur Bonnet, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/qgukpu"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/valquiria-coxinhas.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/valquiria.jpg",
                name: "Coxinhas & Caipirinha",
                nameCook: "Valquiria",
                price: 35,
                spot: "Arthur Bonnet, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/fivZ7h"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/audrey-pate-a-sucre.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
                name: "Cake Design : Pâte à sucres",
                nameCook: "Audrey",
                price: 45,
                spot: "Audrey, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/RjVIV7"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/takako-sushis.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/takako.jpg",
                name: "Sushis, makis et temaris",
                nameCook: "Takako",
                price: 40,
                spot: "Schmidt, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/ywYxcY"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 2,
                image: "https://static.cuistotducoin.com/img/workshops/anne-pate-a-tartiner-maison.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
                name: "Pour enfants : Pâte à tartiner maison",
                nameCook: "Anne",
                price: 25,
                spot: "Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/O0N0S8"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 4,
                image: "https://static.cuistotducoin.com/img/workshops/michel-decouverte-ayurvedique.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/michel.jpg",
                name: "Découverte de la cuisine ayurvédique",
                nameCook: "Michel",
                price: 40,
                spot: "Michel, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/wDNHki"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 4,
                image: "https://static.cuistotducoin.com/img/workshops/ronan-macarons.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/ronan.jpg",
                name: "Macarons",
                nameCook: "Ronan",
                price: 50,
                spot: "Schmidt, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/h1OXxP"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/ahmed-inspiration-africaine.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
                name: "Inspiration Africaine",
                nameCook: "Ahmed",
                price: 35,
                spot: "Schmidt, Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/qieHUn"
            },
            {
                availableSeat: 12,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/gaetan-decouverte-vins-naturels.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/gaetan.jpg",
                name: "A la découverte des vins naturels",
                nameCook: "Gaetan",
                price: 40,
                spot: "Soif de Vins, Brest",
                totalSeat: 12,
                typeform: "https://cuistotducoin.typeform.com/to/UmTqhi"
            },
            {
                availableSeat: 6,
                date: "à venir",
                duration: 2,
                image: "https://static.cuistotducoin.com/img/workshops/audrey-cupcakes-enfants.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
                name: "Pour enfants : Cupcakes",
                nameCook: "Audrey",
                price: 30,
                spot: "Brest",
                totalSeat: 6,
                typeform: "https://cuistotducoin.typeform.com/to/chrUsc"
            },
            {
                availableSeat: 5,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/christian-kouign-amann.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/christian.jpg",
                name: "Kouign Amann",
                nameCook: "Christian",
                price: 40,
                spot: "C Chocolat, Brest",
                totalSeat: 5,
                typeform: "https://cuistotducoin.typeform.com/to/SFGtYO"
            },
            {
                availableSeat: 5,
                date: "à venir",
                duration: 3,
                image: "https://static.cuistotducoin.com/img/workshops/philippe-degustation-the.jpg",
                imageCook: "https://static.cuistotducoin.com/img/cooks/philippe.jpg",
                name: "Dégustation de thés",
                nameCook: "Philippe",
                price: 25,
                spot: "Palais des Thés, Brest",
                totalSeat: 5,
                typeform: "https://cuistotducoin.typeform.com/to/HHelGm"
            }
        ];
        return (react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_8__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_13__["default"].metaInfo.individual.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_13__["default"].metaInfo.individual.description }),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_9__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_10__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Participez \u00E0 des ateliers de cuisine authentiques et en toute convivialit\u00E9 !", description: "Ateliers de Cuisine, D\u00E9gustations, Repas authentiques et conviviaux" }),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true, className: classes.typography }, "Plut\u00F4t atelier de cuisine collectif ou privatis\u00E9, ou encore repas ? Il y en a pour tous les go\u00FBts !"),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid }, typeActivity.map((activity, index) => (react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { key: index, item: true, xs: 12, sm: 6, md: 3, lg: true },
                react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, { container: true, justify: "center" },
                    react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.card },
                        react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_3___default.a, { className: classes.media, image: activity.image, title: activity.title }),
                        react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_2___default.a, { className: classes.cardHeader, title: activity.title, classes: {
                                title: classes.title
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_1___default.a, { className: classes.cardShortContent },
                            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { component: "p" }, activity.description)))))))),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true, className: classes.typography }, "Nos prochains ateliers collectifs"),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_WorkshopCardList__WEBPACK_IMPORTED_MODULE_11__["default"], { workshops: workshops }),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "title", align: "center", component: "h2", gutterBottom: true, className: classes.typography }, "Nos ateliers \u00E0 venir"),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, { variant: "body1", align: "center" }, "Soyez pr\u00E9venu des prochaines dates d'ateliers !"),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_WorkshopCardList__WEBPACK_IMPORTED_MODULE_11__["default"], { workshops: workshopsPending }),
            react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles)(Individual));


/***/ }),

/***/ "./src/pages/Individual/index.tsx":
/*!****************************************!*\
  !*** ./src/pages/Individual/index.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Individual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Individual */ "./src/pages/Individual/Individual.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Individual__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Invite/Invite.tsx":
/*!*************************************!*\
  !*** ./src/pages/Invite/Invite.tsx ***!
  \*************************************/
/*! exports provided: Invite, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invite", function() { return Invite; });
/* harmony import */ var _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/invite.md */ "./node_modules/raw-loader/index.js!./src/content/invite.md");
/* harmony import */ var _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);



// @ts-ignore





const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Invite extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Invitez vos proches" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Invite));


/***/ }),

/***/ "./src/pages/Invite/index.tsx":
/*!************************************!*\
  !*** ./src/pages/Invite/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Invite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invite */ "./src/pages/Invite/Invite.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Invite__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/InviteBusiness/InviteBusiness.tsx":
/*!*****************************************************!*\
  !*** ./src/pages/InviteBusiness/InviteBusiness.tsx ***!
  \*****************************************************/
/*! exports provided: InviteBusiness, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteBusiness", function() { return InviteBusiness; });
/* harmony import */ var _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/invite.md */ "./node_modules/raw-loader/index.js!./src/content/invite.md");
/* harmony import */ var _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);



// @ts-ignore





const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class InviteBusiness extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Invitez vos proches" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_invite_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(InviteBusiness));


/***/ }),

/***/ "./src/pages/InviteBusiness/index.tsx":
/*!********************************************!*\
  !*** ./src/pages/InviteBusiness/index.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InviteBusiness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InviteBusiness */ "./src/pages/InviteBusiness/InviteBusiness.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_InviteBusiness__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Join/Join.tsx":
/*!*********************************!*\
  !*** ./src/pages/Join/Join.tsx ***!
  \*********************************/
/*! exports provided: Join, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Join", function() { return Join; });
/* harmony import */ var _raw_loader_content_join_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/join.md */ "./node_modules/raw-loader/index.js!./src/content/join.md");
/* harmony import */ var _raw_loader_content_join_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_join_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Join extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.join.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.join.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Rejoingnez l'\u00E9quipe de Cuistot du Coin" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_join_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Join));


/***/ }),

/***/ "./src/pages/Join/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Join/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Join__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Join */ "./src/pages/Join/Join.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Join__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Login/Login.tsx":
/*!***********************************!*\
  !*** ./src/pages/Login/Login.tsx ***!
  \***********************************/
/*! exports provided: Login, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var components_LoginForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/LoginForm */ "./src/components/LoginForm/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);








const styles = (theme) => ({});
class Login extends react__WEBPACK_IMPORTED_MODULE_6___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_3__["default"], { hideSignUpLogin: true }),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_4__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Concoctez avec nous une exp\u00E9rience culinaire authentique et gourmande pour vos salari\u00E9s !" }),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_LoginForm__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, { align: "center" },
                "Pas encore membre ? ",
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], { to: "/signup" }, "Inscrivez vous !")),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, { align: "center", gutterBottom: true },
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], { to: "/signup" }, "Vous avez oubliez votre mot de passe ?")),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Login));


/***/ }),

/***/ "./src/pages/Login/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/Login/index.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login */ "./src/pages/Login/Login.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Login__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Mission/Mission.tsx":
/*!***************************************!*\
  !*** ./src/pages/Mission/Mission.tsx ***!
  \***************************************/
/*! exports provided: Mission, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mission", function() { return Mission; });
/* harmony import */ var _raw_loader_content_mission_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/mission.md */ "./node_modules/raw-loader/index.js!./src/content/mission.md");
/* harmony import */ var _raw_loader_content_mission_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_mission_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Mission extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.mission.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.mission.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Nos mission \u00E0 Cuistot du Coin" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_mission_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Mission));


/***/ }),

/***/ "./src/pages/Mission/index.tsx":
/*!*************************************!*\
  !*** ./src/pages/Mission/index.tsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mission */ "./src/pages/Mission/Mission.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Mission__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/NotFound/NotFound.tsx":
/*!*****************************************!*\
  !*** ./src/pages/NotFound/NotFound.tsx ***!
  \*****************************************/
/*! exports provided: NotFound, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFound", function() { return NotFound; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({});
class NotFound extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(NotFound));


/***/ }),

/***/ "./src/pages/NotFound/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/NotFound/index.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotFound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotFound */ "./src/pages/NotFound/NotFound.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_NotFound__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Organize/Organize.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Organize/Organize.tsx ***!
  \*****************************************/
/*! exports provided: Organize, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Organize", function() { return Organize; });
/* harmony import */ var _raw_loader_content_organize_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/organize.md */ "./node_modules/raw-loader/index.js!./src/content/organize.md");
/* harmony import */ var _raw_loader_content_organize_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_organize_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Organize extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.organize.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.organize.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Devenir cuistot avec Cuistot du Coin" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_organize_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Organize));


/***/ }),

/***/ "./src/pages/Organize/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/Organize/index.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Organize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Organize */ "./src/pages/Organize/Organize.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Organize__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Presskit/Presskit.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Presskit/Presskit.tsx ***!
  \*****************************************/
/*! exports provided: Presskit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Presskit", function() { return Presskit; });
/* harmony import */ var _raw_loader_content_presskit_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/presskit.md */ "./node_modules/raw-loader/index.js!./src/content/presskit.md");
/* harmony import */ var _raw_loader_content_presskit_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_presskit_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore






const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Presskit extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_8__["default"].metaInfo.presskit.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_8__["default"].metaInfo.presskit.description }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_presskit_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Presskit));


/***/ }),

/***/ "./src/pages/Presskit/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/Presskit/index.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Presskit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Presskit */ "./src/pages/Presskit/Presskit.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Presskit__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Profil/Profil.tsx":
/*!*************************************!*\
  !*** ./src/pages/Profil/Profil.tsx ***!
  \*************************************/
/*! exports provided: Profil, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profil", function() { return Profil; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({});
class Profil extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Profil));


/***/ }),

/***/ "./src/pages/Profil/index.tsx":
/*!************************************!*\
  !*** ./src/pages/Profil/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profil */ "./src/pages/Profil/Profil.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Profil__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Search/Search.tsx":
/*!*************************************!*\
  !*** ./src/pages/Search/Search.tsx ***!
  \*************************************/
/*! exports provided: Search, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const styles = (theme) => ({});
class Search extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(Search));


/***/ }),

/***/ "./src/pages/Search/index.tsx":
/*!************************************!*\
  !*** ./src/pages/Search/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ "./src/pages/Search/Search.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Search__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/SignUp/SignUp.tsx":
/*!*************************************!*\
  !*** ./src/pages/SignUp/SignUp.tsx ***!
  \*************************************/
/*! exports provided: SignUp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUp", function() { return SignUp; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var components_SignUpForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/SignUpForm */ "./src/components/SignUpForm/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);








const styles = (theme) => ({});
class SignUp extends react__WEBPACK_IMPORTED_MODULE_6___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_3__["default"], { hideSignUpLogin: true }),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_4__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Concoctez avec nous une exp\u00E9rience culinaire authentique et gourmande pour vos salari\u00E9s !" }),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_SignUpForm__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, { align: "center", gutterBottom: true },
                "D\u00E9j\u00E0 membre ? ",
                react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], { to: "/login" }, "Connectez vous !")),
            react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["withStyles"])(styles)(SignUp));


/***/ }),

/***/ "./src/pages/SignUp/index.tsx":
/*!************************************!*\
  !*** ./src/pages/SignUp/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignUp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignUp */ "./src/pages/SignUp/SignUp.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_SignUp__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Team/Team.tsx":
/*!*********************************!*\
  !*** ./src/pages/Team/Team.tsx ***!
  \*********************************/
/*! exports provided: Team, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return Team; });
/* harmony import */ var _raw_loader_content_team_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/team.md */ "./node_modules/raw-loader/index.js!./src/content/team.md");
/* harmony import */ var _raw_loader_content_team_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_team_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Head */ "./src/components/Head/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/metaInfo */ "./src/shared/metaInfo.tsx");



// @ts-ignore







const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Team extends react__WEBPACK_IMPORTED_MODULE_8___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Head__WEBPACK_IMPORTED_MODULE_5__["default"], { title: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.team.title, description: shared_metaInfo__WEBPACK_IMPORTED_MODULE_9__["default"].metaInfo.team.description }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_7__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Qui sommes-nous ? l'\u00E9quipes de Cuistot du Coin" }),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_team_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Team));


/***/ }),

/***/ "./src/pages/Team/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Team/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Team */ "./src/pages/Team/Team.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Team__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Terms/Terms.tsx":
/*!***********************************!*\
  !*** ./src/pages/Terms/Terms.tsx ***!
  \***********************************/
/*! exports provided: Terms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Terms", function() { return Terms; });
/* harmony import */ var _raw_loader_content_terms_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/terms.md */ "./node_modules/raw-loader/index.js!./src/content/terms.md");
/* harmony import */ var _raw_loader_content_terms_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_terms_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);



// @ts-ignore





const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Terms extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Conditions l\u00E9gales" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_terms_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Terms));


/***/ }),

/***/ "./src/pages/Terms/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/Terms/index.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Terms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Terms */ "./src/pages/Terms/Terms.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Terms__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/TermsPro/TermsPro.tsx":
/*!*****************************************!*\
  !*** ./src/pages/TermsPro/TermsPro.tsx ***!
  \*****************************************/
/*! exports provided: TermsPro, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsPro", function() { return TermsPro; });
/* harmony import */ var _raw_loader_content_terms_pro_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/terms-pro.md */ "./node_modules/raw-loader/index.js!./src/content/terms-pro.md");
/* harmony import */ var _raw_loader_content_terms_pro_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_terms_pro_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);



// @ts-ignore





const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class TermsPro extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Conditions l\u00E9gales" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_terms_pro_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(TermsPro));


/***/ }),

/***/ "./src/pages/TermsPro/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/TermsPro/index.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TermsPro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TermsPro */ "./src/pages/TermsPro/TermsPro.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_TermsPro__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Testimony/Testimony.tsx":
/*!*******************************************!*\
  !*** ./src/pages/Testimony/Testimony.tsx ***!
  \*******************************************/
/*! exports provided: Testimony, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Testimony", function() { return Testimony; });
/* harmony import */ var _raw_loader_content_testimony_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!content/testimony.md */ "./node_modules/raw-loader/index.js!./src/content/testimony.md");
/* harmony import */ var _raw_loader_content_testimony_md__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_content_testimony_md__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/docs/MarkdownElement */ "@material-ui/docs/MarkdownElement");
/* harmony import */ var _material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Hero */ "./src/components/Hero/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);



// @ts-ignore





const styles = (theme) => ({
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    }
});
class Testimony extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Hero__WEBPACK_IMPORTED_MODULE_6__["default"], { imageURL: "https://static.cuistotducoin.com/img/home/landing.jpg", videoURL: "https://static.cuistotducoin.com/video/landing-video.mp4", valueProposition: "Ils nous font confiance" }),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_docs_MarkdownElement__WEBPACK_IMPORTED_MODULE_3___default.a, { text: _raw_loader_content_testimony_md__WEBPACK_IMPORTED_MODULE_0__ })),
            react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Testimony));


/***/ }),

/***/ "./src/pages/Testimony/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/Testimony/index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Testimony__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Testimony */ "./src/pages/Testimony/Testimony.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Testimony__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/Workshop/Workshop.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Workshop/Workshop.tsx ***!
  \*****************************************/
/*! exports provided: Workshop, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Workshop", function() { return Workshop; });
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/colors/green */ "@material-ui/core/colors/green");
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tabs */ "@material-ui/core/Tabs");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_AccessTime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/AccessTime */ "@material-ui/icons/AccessTime");
/* harmony import */ var _material_ui_icons_AccessTime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccessTime__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_KeyboardArrowUp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowUp */ "@material-ui/icons/KeyboardArrowUp");
/* harmony import */ var _material_ui_icons_KeyboardArrowUp__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowUp__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_Kitchen__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Kitchen */ "@material-ui/icons/Kitchen");
/* harmony import */ var _material_ui_icons_Kitchen__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Kitchen__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_LocalDining__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/LocalDining */ "@material-ui/icons/LocalDining");
/* harmony import */ var _material_ui_icons_LocalDining__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LocalDining__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Lock */ "@material-ui/icons/Lock");
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_People__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/People */ "@material-ui/icons/People");
/* harmony import */ var _material_ui_icons_People__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_People__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var components_BookForm__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! components/BookForm */ "./src/components/BookForm/index.tsx");
/* harmony import */ var components_Cover__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! components/Cover */ "./src/components/Cover/index.tsx");
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_StarRating__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! components/StarRating */ "./src/components/StarRating/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_20__);





















const styles = (theme) => ({
    avatar: {
        backgroundColor: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2___default.a[500],
        height: 80,
        width: 80
    },
    button: {
        margin: theme.spacing.unit
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    infoReservartion: {
        padding: theme.spacing.unit
    },
    innerGrid: {
        padding: 24
    },
    tabs: {
        minWidth: 0
    }
});
class Workshop extends react__WEBPACK_IMPORTED_MODULE_20___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_20___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_18__["default"], { static: true }),
            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(components_Cover__WEBPACK_IMPORTED_MODULE_16__["default"], { imageURL: this.props.image }),
            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 2 },
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.avatar, src: this.props.imageCook }))),
                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 10 },
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            this.props.rating && (react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(components_StarRating__WEBPACK_IMPORTED_MODULE_19__["default"], { rating: this.props.rating }),
                                this.props.ratingNumber && (react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "caption", className: classes.ratingNumber },
                                    "(",
                                    this.props.ratingNumber,
                                    ")")))),
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "title", component: "p", gutterBottom: true },
                                "Recontrez ",
                                this.props.nameCook),
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, this.props.name))))),
            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center", className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 8 },
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7___default.a, { value: 0, indicatorColor: "primary", textColor: "primary" },
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Au menu", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Le Cuistot", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Commentaires", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Informations compl\u00E9mentaires", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { className: classes.tabs, icon: react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_KeyboardArrowUp__WEBPACK_IMPORTED_MODULE_10___default.a, null) })),
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center", className: classes.innerGrid },
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_Kitchen__WEBPACK_IMPORTED_MODULE_11___default.a, null),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null, this.props.eventType))),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_LocalDining__WEBPACK_IMPORTED_MODULE_12___default.a, null),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null, this.props.cuisineType))),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_People__WEBPACK_IMPORTED_MODULE_14___default.a, null),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null,
                                    "de ",
                                    this.props.minSeat,
                                    " \u00E0 ",
                                    this.props.maxSeat,
                                    " invit\u00E9s"))),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_AccessTime__WEBPACK_IMPORTED_MODULE_9___default.a, null),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null, this.props.timeEvent)))),
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null,
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Au menu"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1", component: "p", paragraph: true }, "Atelier + A emporter : Initiation \u00E0 la p\u00E2te \u00E0 sucre D\u00E9couvrez la p\u00E2te \u00E0 sucre et ses techniques tr\u00E8s sp\u00E9cifique avec notre nouveau cuistot: Audrey ! Venez apprendre \u00E0 sublimer vos p\u00E2tisseries et \u00E0 confectionner vos g\u00E2teaux d\u2019anniversaire. Pr\u00E9paration de la ganache au chocolat qui garnira et recouvrira le g\u00E2teau- Pr\u00E9paration des \u00E9l\u00E9ments de d\u00E9corations et de la p\u00E2te \u00E0 sucre (technique de lissage et de pose)"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Photos & Videos"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Le Cuistot"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1", component: "p", paragraph: true }, "Audrey passait son temps dans la cuisine de sa grand-m\u00E8re quand elle \u00E9tait petite. Et elle a toujours aim\u00E9 la p\u00E2tisserie et tester de nouvelles recettes, de nouvelles techniques. Jusqu'\u00E0 ce que sa passion et ses proches l'a pouss\u00E8rent \u00E0 passer son CAP. Maintenant elle souhaite le faire d\u00E9couvrir aux autres."),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Commentaires"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Informations compl\u00E9mentaires"))),
                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 4 },
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h3" }, "Faites votre r\u00E9servation :"),
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4___default.a, { elevation: 1, className: classes.infoReservartion },
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(components_BookForm__WEBPACK_IMPORTED_MODULE_15__["default"], { price: this.props.price, availableSeat: this.props.availableSeat, dayEndBook: this.props.dayEndBook })),
                    react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null,
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_13___default.a, null),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" }, "Paiement s\u00E9curis\u00E9 par Mangopay"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" },
                            "Vous pouvez payer avec",
                            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("span", null,
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/visa.png", alt: "visa" }),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/masterpass.png", alt: "masterpass" }),
                                react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/maestro.png", alt: "maestro" }))),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" }, "Conditions d'annulation"),
                        react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { variant: "contained", color: "primary", className: classes.button }, "Poser une question au cuistot")))),
            react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_17__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles)(Workshop));


/***/ }),

/***/ "./src/pages/Workshop/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/Workshop/index.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Workshop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Workshop */ "./src/pages/Workshop/Workshop.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_Workshop__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/routes.tsx":
/*!************************!*\
  !*** ./src/routes.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jaredpalmer/after */ "@jaredpalmer/after");
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Loading */ "./src/components/Loading/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ([
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Business/Business */ "./src/pages/Business/Business.tsx"))
        }),
        exact: true,
        path: "/business"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Cook */ "./src/pages/Cook/index.tsx"))
        }),
        exact: true,
        path: "/cook/:id"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Gift */ "./src/pages/Gift/index.tsx"))
        }),
        exact: true,
        path: "/gift"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/GroupLesson */ "./src/pages/GroupLesson/index.tsx"))
        }),
        exact: true,
        path: "/group-lesson"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Home */ "./src/pages/Home/index.tsx"))
        }),
        exact: true,
        path: "/"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/HowItWorks */ "./src/pages/HowItWorks/index.tsx"))
        }),
        exact: true,
        path: "/how-it-works"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Individual */ "./src/pages/Individual/index.tsx"))
        }),
        exact: true,
        path: "/individual"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Invite */ "./src/pages/Invite/index.tsx"))
        }),
        exact: true,
        path: "/invite"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/InviteBusiness */ "./src/pages/InviteBusiness/index.tsx"))
        }),
        exact: true,
        path: "/invite-business"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Join */ "./src/pages/Join/index.tsx"))
        }),
        exact: true,
        path: "/join"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Terms */ "./src/pages/Terms/index.tsx"))
        }),
        exact: true,
        path: "/terms"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/TermsPro */ "./src/pages/TermsPro/index.tsx"))
        }),
        exact: true,
        path: "/terms-pro"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Login */ "./src/pages/Login/index.tsx"))
        }),
        exact: true,
        path: "/login"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Mission */ "./src/pages/Mission/index.tsx"))
        }),
        exact: true,
        path: "/mission"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Organize */ "./src/pages/Organize/index.tsx"))
        }),
        exact: true,
        path: "/organize"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Presskit */ "./src/pages/Presskit/index.tsx"))
        }),
        exact: true,
        path: "/presskit"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Profil */ "./src/pages/Profil/index.tsx"))
        }),
        exact: true,
        path: "/profil/:id"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Search */ "./src/pages/Search/index.tsx"))
        }),
        exact: true,
        path: "/search"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/SignUp */ "./src/pages/SignUp/index.tsx"))
        }),
        exact: true,
        path: "/signup"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Team */ "./src/pages/Team/index.tsx"))
        }),
        exact: true,
        path: "/team"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Testimony */ "./src/pages/Testimony/index.tsx"))
        }),
        exact: true,
        path: "/testimony"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/Workshop */ "./src/pages/Workshop/index.tsx"))
        }),
        exact: true,
        path: "/workshop/:id"
    },
    {
        component: Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["asyncComponent"])({
            Placeholder: () => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null),
            loader: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! pages/NotFound */ "./src/pages/NotFound/index.tsx"))
        })
    }
]);


/***/ }),

/***/ "./src/server.tsx":
/*!************************!*\
  !*** ./src/server.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jaredpalmer/after */ "@jaredpalmer/after");
/* harmony import */ var _jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var createApolloClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! createApolloClient */ "./src/createApolloClient.js");
/* harmony import */ var Document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Document */ "./src/Document.tsx");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jss_lib_jss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-jss/lib/jss */ "react-jss/lib/jss");
/* harmony import */ var react_jss_lib_jss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jss_lib_jss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-jss/lib/JssProvider */ "react-jss/lib/JssProvider");
/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! routes */ "./src/routes.tsx");
/* harmony import */ var theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! theme */ "./src/theme.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};












let assets;
const syncLoadAssets = () => {
    assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");
};
syncLoadAssets();
const server = express__WEBPACK_IMPORTED_MODULE_4___default()()
    .disable("x-powered-by")
    .use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static("./build/public"))
    .get("/*", (req, res) => __awaiter(undefined, void 0, void 0, function* () {
    const client = Object(createApolloClient__WEBPACK_IMPORTED_MODULE_2__["default"])({ ssrMode: true });
    const sheetsRegistry = new react_jss_lib_jss__WEBPACK_IMPORTED_MODULE_8__["SheetsRegistry"]();
    const generateClassName = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["createGenerateClassName"])({
        productionPrefix: "c"
    });
    const customRenderer = (node) => {
        const app = (react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_6__["ApolloProvider"], { client: client },
            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_9___default.a, { registry: sheetsRegistry, generateClassName: generateClassName },
                react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["MuiThemeProvider"], { theme: theme__WEBPACK_IMPORTED_MODULE_11__["default"], sheetsManager: new Map() }, node))));
        return Object(react_apollo__WEBPACK_IMPORTED_MODULE_6__["getDataFromTree"])(app).then(() => {
            const initialApolloState = client.extract();
            const html = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_7__["renderToString"])(app);
            return { html, initialApolloState };
        });
    };
    try {
        const options = {
            req,
            res,
            routes: routes__WEBPACK_IMPORTED_MODULE_10__["default"],
            // tslint:disable-next-line:object-literal-sort-keys
            assets,
            customRenderer,
            document: Document__WEBPACK_IMPORTED_MODULE_3__["default"],
            css: sheetsRegistry.toString()
        };
        const html = yield Object(_jaredpalmer_after__WEBPACK_IMPORTED_MODULE_0__["render"])(options);
        res.send(html);
    }
    catch (error) {
        res.json(error);
    }
}));
/* harmony default export */ __webpack_exports__["default"] = (server);


/***/ }),

/***/ "./src/shared/metaInfo.tsx":
/*!*********************************!*\
  !*** ./src/shared/metaInfo.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    metaInfo: {
        business: {
            description: "Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux... Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !",
            href: "https://www.cuistotducoin.com/business",
            title: "Ateliers de cuisine en entreprise : Partager un moment convivial et authentique avec votre équipe"
        },
        gift: {
            description: "Offrez un moment culinaire authentique et convivial à vos proches avec notre carte cadeau pour un atelier de cuisine, valable 1 an pour tous nos ateliers Cuistot du Coin",
            href: "https://www.cuistotducoin.com/gift",
            title: "Cadeau cours cuisine - Offrez un atelier de cuisine Cuistot du coin à vos proches"
        },
        home: {
            description: "Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots d'ailleurs.",
            href: "https://www.cuistotducoin.com",
            title: "Atelier de cuisine pour particuliers et entreprises"
        },
        howitworks: {
            description: "Que vous soyez Gourmet, Cuistot, Entreprise ou encore Partenaires, Cuistot du Coin est la pour vous aider",
            href: "https://www.cuistotducoin.com/how-it-works",
            title: "Cuistot du coin : Comment ça marche ?"
        },
        individual: {
            description: "Ateliers de cuisine collectif, privatisé, ou encore repas à domicile... Offez-vous un moment culinaire authentique et convivial !",
            href: "https://www.cuistotducoin.com/individual",
            title: "Ateliers de cuisine pour les particuliers : participez à des ateliers de cuisine authentiques et en toute convivialité !"
        },
        join: {
            description: "Offrez un moment culinaire authentique et convivial à vos proches avec notre carte cadeau pour un atelier de cuisine, valable 1 an pour tous nos ateliers Cuistot du Coin",
            href: "https://www.cuistotducoin.com/join",
            title: "Cadeau cours cuisine - Offrez un atelier de cuisine Cuistot du coin à vos proches"
        },
        mission: {
            description: "Cuistot du coin à trois missions: Des rencontres aussi riches que les saveurs en cuisine; La sauvegarde d’un patrimoine et de savoir-faire; Une véritable Immersion dans des univers culinaires diversifiés",
            href: "https://www.cuistotducoin.com/mission",
            title: "Cuistot du coin : Nos missions"
        },
        organize: {
            description: "Rejoignez nos Cuistots",
            href: "https://www.cuistotducoin.com/organize",
            title: "Cuistot du coin : Nos missions"
        },
        payment: {
            description: "Paiement",
            href: "https://www.cuistotducoin.com/payment",
            title: "Cuistot du coin : Paiement"
        },
        presskit: {
            description: "Vous vous en savoir plus sur Cuistot du coin ? Voici quelques articles dans la presse",
            href: "https://www.cuistotducoin.com/presskit",
            title: "Apprendez en plus sur Cuistot du Coin : Articles de presse"
        },
        team: {
            description: "Découvrez qui se cache derrière Cuistot du Coin",
            href: "https://www.cuistotducoin.com/team",
            title: "Qui sommes-nous ? l'équipe de Cuistot du Coin"
        }
    }
});


/***/ }),

/***/ "./src/theme.tsx":
/*!***********************!*\
  !*** ./src/theme.tsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/colors/green */ "@material-ui/core/colors/green");
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/colors/red */ "@material-ui/core/colors/red");
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);



// Configure Material UI theme
const theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["createMuiTheme"])({
    palette: {
        primary: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_0___default.a,
        secondary: _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_1___default.a
    },
    typography: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: 14
    }
});
/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! C:\Users\Romain\Documents\GitHub\cuistot\frontend\src */"./src/index.ts");


/***/ }),

/***/ "@jaredpalmer/after":
/*!*************************************!*\
  !*** external "@jaredpalmer/after" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@jaredpalmer/after");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Card":
/*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ "@material-ui/core/CardContent":
/*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ "@material-ui/core/CardHeader":
/*!***********************************************!*\
  !*** external "@material-ui/core/CardHeader" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardHeader");

/***/ }),

/***/ "@material-ui/core/CardMedia":
/*!**********************************************!*\
  !*** external "@material-ui/core/CardMedia" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),

/***/ "@material-ui/core/Chip":
/*!*****************************************!*\
  !*** external "@material-ui/core/Chip" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Chip");

/***/ }),

/***/ "@material-ui/core/CircularProgress":
/*!*****************************************************!*\
  !*** external "@material-ui/core/CircularProgress" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CircularProgress");

/***/ }),

/***/ "@material-ui/core/Divider":
/*!********************************************!*\
  !*** external "@material-ui/core/Divider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Divider");

/***/ }),

/***/ "@material-ui/core/Grid":
/*!*****************************************!*\
  !*** external "@material-ui/core/Grid" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),

/***/ "@material-ui/core/Grid/Grid":
/*!**********************************************!*\
  !*** external "@material-ui/core/Grid/Grid" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid/Grid");

/***/ }),

/***/ "@material-ui/core/Hidden":
/*!*******************************************!*\
  !*** external "@material-ui/core/Hidden" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Hidden");

/***/ }),

/***/ "@material-ui/core/InputLabel":
/*!***********************************************!*\
  !*** external "@material-ui/core/InputLabel" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputLabel");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/Tab":
/*!****************************************!*\
  !*** external "@material-ui/core/Tab" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tab");

/***/ }),

/***/ "@material-ui/core/Tabs":
/*!*****************************************!*\
  !*** external "@material-ui/core/Tabs" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tabs");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/colors/green":
/*!*************************************************!*\
  !*** external "@material-ui/core/colors/green" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/green");

/***/ }),

/***/ "@material-ui/core/colors/grey":
/*!************************************************!*\
  !*** external "@material-ui/core/colors/grey" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/grey");

/***/ }),

/***/ "@material-ui/core/colors/red":
/*!***********************************************!*\
  !*** external "@material-ui/core/colors/red" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/red");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/docs/MarkdownElement":
/*!****************************************************!*\
  !*** external "@material-ui/docs/MarkdownElement" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/docs/MarkdownElement");

/***/ }),

/***/ "@material-ui/icons/AccessTime":
/*!************************************************!*\
  !*** external "@material-ui/icons/AccessTime" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AccessTime");

/***/ }),

/***/ "@material-ui/icons/Face":
/*!******************************************!*\
  !*** external "@material-ui/icons/Face" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Face");

/***/ }),

/***/ "@material-ui/icons/HourglassFull":
/*!***************************************************!*\
  !*** external "@material-ui/icons/HourglassFull" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/HourglassFull");

/***/ }),

/***/ "@material-ui/icons/KeyboardArrowUp":
/*!*****************************************************!*\
  !*** external "@material-ui/icons/KeyboardArrowUp" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/KeyboardArrowUp");

/***/ }),

/***/ "@material-ui/icons/Kitchen":
/*!*********************************************!*\
  !*** external "@material-ui/icons/Kitchen" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Kitchen");

/***/ }),

/***/ "@material-ui/icons/LocalDining":
/*!*************************************************!*\
  !*** external "@material-ui/icons/LocalDining" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LocalDining");

/***/ }),

/***/ "@material-ui/icons/Lock":
/*!******************************************!*\
  !*** external "@material-ui/icons/Lock" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Lock");

/***/ }),

/***/ "@material-ui/icons/People":
/*!********************************************!*\
  !*** external "@material-ui/icons/People" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/People");

/***/ }),

/***/ "@material-ui/icons/Place":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Place" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Place");

/***/ }),

/***/ "@material-ui/icons/Star":
/*!******************************************!*\
  !*** external "@material-ui/icons/Star" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Star");

/***/ }),

/***/ "@material-ui/icons/StarBorder":
/*!************************************************!*\
  !*** external "@material-ui/icons/StarBorder" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/StarBorder");

/***/ }),

/***/ "@material-ui/icons/StarHalf":
/*!**********************************************!*\
  !*** external "@material-ui/icons/StarHalf" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/StarHalf");

/***/ }),

/***/ "apollo-cache-inmemory":
/*!****************************************!*\
  !*** external "apollo-cache-inmemory" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-client":
/*!********************************!*\
  !*** external "apollo-client" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "apollo-link-http":
/*!***********************************!*\
  !*** external "apollo-link-http" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

/***/ }),

/***/ "aws-serverless-express":
/*!*****************************************!*\
  !*** external "aws-serverless-express" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-serverless-express");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "formik":
/*!*************************!*\
  !*** external "formik" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("formik");

/***/ }),

/***/ "formik-material-ui":
/*!*************************************!*\
  !*** external "formik-material-ui" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("formik-material-ui");

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/*!*******************************!*\
  !*** external "react-apollo" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-hubspot-form":
/*!*************************************!*\
  !*** external "react-hubspot-form" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-hubspot-form");

/***/ }),

/***/ "react-jss/lib/JssProvider":
/*!********************************************!*\
  !*** external "react-jss/lib/JssProvider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/JssProvider");

/***/ }),

/***/ "react-jss/lib/jss":
/*!************************************!*\
  !*** external "react-jss/lib/jss" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/jss");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-slick":
/*!******************************!*\
  !*** external "react-slick" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-slick");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map