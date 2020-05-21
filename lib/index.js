import { mergeWith } from 'lodash';
import mergeCustomizer from './helper';

const { isArray } = Array;

function merge(...configs) {
  if (configs && configs.length === 1) {
    if (isArray(configs[0])) {
      return mergeWith({}, ...configs[0], mergeCustomizer(configs[0]));
    }

    if (configs[0].arrayCustomizer || configs[0].objectCustomizer) {
      return (...cfgs) => {
        if (cfgs && cfgs.length === 1 && isArray(cfgs[0])) {
          return mergeWith({}, ...cfgs[0], mergeCustomizer(configs[0]));
        }
        return mergeWith({}, ...cfgs, mergeCustomizer(configs[0]));
      };
    }

    return configs[0];
  }

  return mergeWith({}, ...configs, mergeCustomizer());
}

const extendCustomizers = {
  arrayCustomizer(arr1, arr2) {
    return mergeWith([], arr2 || arr1, mergeCustomizer(extendCustomizers));
  },
  objectCustomizer(obj1, obj2) {
    return mergeWith({}, obj2 || obj1, mergeCustomizer(extendCustomizers));
  }
};

function extend(...configs) {
  return merge(extendCustomizers)({}, ...configs);
}

module.exports = merge;
module.exports.extend = extend;
