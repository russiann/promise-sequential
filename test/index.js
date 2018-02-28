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

  it('should not keep running after one of the promises is rejected', (done) => {

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

    Promise.resolve(
      promiseq(promises)
      .catch(() => {
        /*
          This catch block exists in order to force the '.then' of the wrapper promise
          (Promise.resolve(...) above ) to execute. If the behavior this test is protecting against
          occurs, 'promiseq' will continue calling promises in sequence even after this
          catch block was executed. After 'promiseq' is resolved, the expectations can be tested
          inside the next '.then' block. Without this catch block, the catch block of
          Promise.resolve(...) should be called immeditely, but it would not be possible to detect
          if anything was executed afterwards.

          Underneath the hood, promise-sequential uses a reduce function which originally called
          every promise in the sequence in the following way:

          [ () => updateResolvedPromises('p1').catch().then()
            () => Promise.reject().catch(() => reject()).then()   <--- Rejects 'promiseq' but reduce function not interrupted
            () => updateResolvedPromises('p3').catch().then()     <--- will execute anyway
          ].reduce(...)
            .then()

          Instead, as soon as the first promise is rejected, the error thrown should bail out
          by executing the 'promiseq' catch block outside of the reduce. E.g.

          [ () => updateResolvedPromises('p1')
            () => Promise.reject())
            () => .then(updateResolvedPromises('p3'))
          ].reduce(...)
              .then()
              .catch(() => reject())  <-- after first reject, reduce will stop execution
        */
      })

    )
    .then(() => {
      expect(resolvedPromises).to.deep.equal(expectedResolvedPromises);
      done();
    })
  });

})
