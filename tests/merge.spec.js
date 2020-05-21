/* global describe, it */
const assert = require('assert');
const merge = require('..');

describe('Merge Test', () => {
  it('should take array config and return as object config', async () => {
    const inputCfg = [[{ input: 'test' }]];
    const outputCfg = {
      '0': { input: 'test' } // eslint-disable-line quote-props
    };
    assert.deepEqual(merge(inputCfg), outputCfg);
  });

  it('should take single config and return the config', async () => {
    const inputCfg = {
      input: 'test'
    };
    assert.deepEqual(merge(inputCfg), inputCfg);
  });

  it('should append configs props', async () => {
    const cfg1 = {
      input: 'test',
      output: [{
        dir: 'assets/umd',
        name: 'app'
      }]
    };
    const cfg2 = {
      output: [{
        dir: 'assets/cjs',
        name: 'app'
      }]
    };
    const mergedCfg = {
      input: 'test',
      output: [{
        dir: 'assets/umd',
        name: 'app'
      }, {
        dir: 'assets/cjs',
        name: 'app'
      }]
    };

    assert.deepEqual(merge(cfg1, cfg2), mergedCfg);
  });

  it('should append and dedupe configs props', async () => {
    const cfg1 = {
      input: 'test',
      output: [{
        dir: 'assets/umd',
        name: 'app'
      }]
    };
    const cfg2 = {
      output: [{
        dir: 'assets/cjs',
        name: 'app'
      }, {
        dir: 'assets/umd',
        name: 'app'
      }, {
        dir: 'assets/iife',
        name: 'app'
      }]
    };
    const mergedCfg = {
      input: 'test',
      output: [{
        dir: 'assets/umd',
        name: 'app'
      }, {
        dir: 'assets/cjs',
        name: 'app'
      }, {
        dir: 'assets/iife',
        name: 'app'
      }]
    };

    assert.deepEqual(merge(cfg1, cfg2), mergedCfg);
  });

  it('should take custom array analyser and should override only array config values', async () => {
    const customizerCfg = {
      arrayCustomizer: (arr1, arr2) => arr2
    };

    const cfg1 = {
      input: 'test',
      output: [{
        dir: 'assets/umd'
      }]
    };

    const cfg2 = {
      output: [{
        dir: 'assets/cjs'
      }]
    };

    const resultCfg = {
      input: 'test',
      output: [{
        dir: 'assets/cjs'
      }]
    };

    assert.deepEqual(merge(customizerCfg)(cfg1, cfg2), resultCfg);
  });

  it('should take custom array analyser and single config', async () => {
    const customizerCfg = {
      arrayCustomizer: (arr1, arr2) => (arr1 || arr2)
    };

    const cfg1 = [{ input: ['test'] }];

    const resultCfg = { input: ['test'] };

    assert.deepEqual(merge(customizerCfg)(cfg1), resultCfg);
  });

  it('should take custom object analyser', async () => {
    const customizerCfg = {
      objectCustomizer: (obj1, obj2) => ({
        name: `${obj1.name}-${obj2.name}`
      })
    };

    const cfg1 = {
      input: {
        name: 'test'
      }
    };

    const cfg2 = {
      input: {
        name: 'test2'
      }
    };

    const resultCfg = {
      input: {
        name: 'test-test2'
      }
    };

    assert.deepEqual(merge(customizerCfg)(cfg1, cfg2), resultCfg);
  });
});
