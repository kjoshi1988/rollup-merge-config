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

### **`merge({ arrayCustomizer, objectCustomizer })(...configuration | [...configuration])`**

`merge` behavior can be customized through a customization API.

```javascript
// Customizing array/object behavior
const output = merge(
  {
    arrayCustomizer(a, b, key) {
      if (key === 'bar') {
        return _.uniq([...a, ...b]);
      }

      // Fall back to default merging
      return undefined;
    },
    objectCustomizer(a, b, key) {
      if (key === 'foo') {
        // Custom merging
        return _.merge({}, a, b);
      }

      // Fall back to default merging
      return undefined;
    }
  }
)(object1, object2, object3, ...);

// Example
//config1
{
    foo: ['obj1', 'obj2'],
    bar: {name: 'obj1'}
}

//config2
{
    foo: ['obj2', 'obj3'],
    bar: {name2: 'obj2'}
}

//merged output
{
  foo: ['obj1', 'obj2', 'obj3'],
  bar: {name: 'obj1', name2: 'obj2'}
}
```

In the above example, `arrayCustomizer` will be invoked for each property of `Array` type, i.e:
```
arrayCustomizer(['obj1', 'obj2'], ['obj2', 'obj3'], 'foo');
```
and `objectCustomizer` will be invoked for each property of `Object` type, i.e:
```
objectCustomizer({name: 'obj1'}, {name2: 'obj2'}, 'bar');
```
