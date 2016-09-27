(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Library", [], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory();
	else
		root["Library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (promises) {
	
	  if (!Array.isArray(promises)) {
	    throw new Error('First argument need to be an array of Promises');
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var count = 0;
	    var results = [];
	
	    var iterateeFunc = function iterateeFunc(previousPromise, currentPromise) {
	      return previousPromise.then(function (result) {
	        if (count++ !== 0) results = results.concat(result);
	        return currentPromise(result, results, count);
	      }).catch(function (err) {
	        return reject(err);
	      });
	    };
	
	    promises = promises.concat(function () {
	      return Promise.resolve();
	    });
	
	    promises.reduce(iterateeFunc, Promise.resolve(false)).then(function (res) {
	      resolve(results);
	    });
	  });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Library.js.map