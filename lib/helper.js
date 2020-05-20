import {
  isEqual, unionWith, cloneDeep, mergeWith, isPlainObject
} from 'lodash';

const { isArray } = Array;

const mergeCustomizer = ({ arrayCustomizer, objectCustomizer, key } = {}) => ((obj1, obj2, k) => {
  const modKey = key ? `${key}.${k}` : k;
  if (isArray(obj1) && isArray(obj2)) {
    const result = arrayCustomizer && arrayCustomizer(obj1, obj2, modKey);
    return result || mergeWith([], unionWith(obj1, obj2, isEqual), mergeCustomizer({
      arrayCustomizer, objectCustomizer, key: modKey
    }));
  }

  if (isPlainObject(obj1) && isPlainObject(obj2)) {
    const result = objectCustomizer && objectCustomizer(obj1, obj2, modKey);

    return result || mergeWith({}, obj1, obj2, mergeCustomizer({
      arrayCustomizer, objectCustomizer, key: modKey
    }));
  }

  if (isPlainObject(obj2)) {
    return cloneDeep(obj2);
  }

  if (isArray(obj2)) {
    return [...obj2];
  }

  return obj2;
});

export default mergeCustomizer;
