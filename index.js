// IIFE in "optimized" format, see https://github.com/nolanlawson/optimize-js
!(function (root) {
  function promiseSequential (promises) {

    if (!Array.isArray(promises)) {
      throw new Error('First argument need to be an array of Promises');
    }

    return new Promise((resolve, reject) => {

      let count = 0;
      let results = [];

      const iterateeFunc = (previousPromise, currentPromise) => {
        return previousPromise
          .then(function(result) {
            if (count++ !== 0) results = results.concat(result);
            return currentPromise(result, results, count);
          })
          .catch((err) => {
            return reject(err);
          });
      }

      promises = promises.concat(() => Promise.resolve());

      promises
        .reduce(iterateeFunc, Promise.resolve(false))
        .then(function(res) {
          resolve(results);
        })

    });
  }
  
  // Universal Module Definition
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('promiseSequential', () => promiseSequential);
  } else if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = promiseSequential;
  } else {
    // Browser/other
    root.promiseSequential = promiseSequential;
  }
})(this);
