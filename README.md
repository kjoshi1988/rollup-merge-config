[![Build Status](https://travis-ci.org/kjoshi1988/rollup-merge-config.svg)](https://travis-ci.org/github/kjoshi1988/rollup-merge-config) [![codecov](https://codecov.io/gh/kjoshi1988/rollup-merge-config/branch/master/graph/badge.svg)](https://codecov.io/gh/kjoshi1988/rollup-merge-config)

# rollup-merge-config: extend configurations with ease.
Rollup-merge-config provides `merge` and `extend` function that helps in merging/extending roll-up configs with ease.
It provides array concatenation and object merging functionality.

It also supports custom array as well as custom object merge.

## Basic Merge Capability

### **`merge(...configuration | [...configuration])`**

`merge` is the core of the API. 
This is all you need unless you want further customization.

```javascript
// Default API
const output = merge(object1, object2, object3, ...);
//or
const output = merge([object1, object2, object3]);

//Example:
const output = merge(
  { type: "i20", brand: "hyundai" },
  { type: "verna" }
);
// output:
// { type: "i20", brand: "hyundai", segment: "hatchback"}

// In case the keys match across different objects.
// the latter will take precedence.
const output = merge(
  { type: "i20", brand: "hyundai" },
  { type: "verna" }
);
// output:
// { type: "verna", brand: "hyundai" }
```
