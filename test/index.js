const expect = require("chai").expect;
const promiseq = require('../index.js');

describe('sequentially promises', () => {

  it('should throw a error if not pass an array of promises', () => {
    const func = () => {
      promiseq({});
    }
    expect(func).to.throw('First argument need to be an array of Promises');
  });

  it('should return an Array as response', (done) => {

    let promises = [1,2].map((item) => {

      return function (previousResponse, results, count) {
        return new Promise(resolve => {
          setTimeout(function () {
            resolve(item)
          }, 1000)
        });
      }

    });
    const array = [1,2,3,4]
    promiseq(promises)
      .then(res => {
        expect(res).to.be.instanceof(Array);
        done();
      });

  });

  it('should return 1 as param of catch function', (done) => {

    let promises = [1,2].map((item) => {
      return function (previousResponse) {
        return new Promise((r, reject) => {
          setTimeout(() => {
            reject(1)
          }, 1000)
        })
      }
    });

    promiseq(promises)
      .catch(err => {
        expect(err).to.equal(1);
        done();
      })
  });

  it('should not keep running after one of the promises throws error', (done) => {

    const resolvedPromises = { p1: false, p2: false, p3: false };
    const expectedResolvedPromises = { p1: true, p2: false, p3: false };

    function updateResolvedPromises(key) {
      return new Promise((resolve) => {
        resolvedPromises[key] = true;
        resolve();
      });
    }

    const promises = [
      () => updateResolvedPromises('p1'),

      () => Promise.reject(),

      () => updateResolvedPromises('p3'),
    ];

    Promise.resolve(promiseq(promises))
    .catch(() => {
      expect(resolvedPromises).to.deep.equal(expectedResolvedPromises);
      done();
    })

  });

})
