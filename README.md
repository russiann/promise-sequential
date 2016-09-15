# promise-sequencial
Simple like Promise.all(), but sequentially!


## Installation

```
npm install --save promise-sequencial
```
## Usage

```js
const sequencial = require('promise-sequencial');

const items = [
  () => new Promise( ... )
  () => new Promise( ... )
  () => new Promise( ... )
];

sequencial(items)
.then(res => {
  // ...
})
.catch(err => {
  // ...
})
```

There is only one difference between Promise.all usage and promise-sequencial usage: promise-sequencial receive an Array of functions that each returns a promise.

Each function brings four params:

| Name              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| previousResponse  | The response of previous iteration                           |
| responses         | All responses received at the time                           |
| count             | The current count.                                           |

### More complex usage

```js

const sequencial = require('promise-sequencial');
const array = [1,2,3,4,5];

sequencial(array.map((item) => {
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
