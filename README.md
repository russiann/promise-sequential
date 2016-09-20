# promise-sequential
Simple like Promise.all(), but sequentially!

[![NPM version](https://badge.fury.io/js/promise-sequential.png)](http://badge.fury.io/js/promise-sequential)

[![Npm Downloads](https://nodei.co/npm/promise-sequential.png?downloads=true&stars=true)](https://nodei.co/npm/promise-sequential.png?downloads=true&stars=true)


## Installation

```
npm install --save promise-sequential
```
## Usage

```js
const sequential = require('promise-sequential');

const items = [
  () => new Promise( ... )
  () => new Promise( ... )
  () => new Promise( ... )
];

sequential(items)
.then(res => {
  // ...
})
.catch(err => {
  // ...
})
```

There is only one difference between Promise.all usage and promise-sequential usage: promise-sequential receive an Array of functions that each returns a promise.

Each function brings three params:

| Name              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| previousResponse  | The response of previous iteration                           |
| responses         | All responses received at the time                           |
| count             | The current count.                                           |

### More complex usage

```js

const sequential = require('promise-sequential');
const array = [1,2,3,4,5];

sequential(array.map((item) => {
  return function(previousResponse, responses, count) {

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(item)
      }, 1000)
    })

  }
}))
.then(res => {
  // ...
})
.catch(err => {
  // ...
})
```
