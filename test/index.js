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

})
