'use strict';
module.exports = function (promises) {

  if (!Array.isArray(promises)) {
    throw new Error('First argument need to be an array of Promises');
  }

  let count = 0;
  let results = [];

  const iterateeFunc = (previousPromise, currentPromise) => {
    return previousPromise
      .then(function (result) {
        if (count++ !== 0) results = results.concat(result);
        return currentPromise(result, results, count);
      })
  }

  return promises
  // reduce() concatenates the promises. E.g. p1.then(p2.then(p3.then()))
  .reduce(iterateeFunc, Promise.resolve(false))
  .then(() => results)
};
