/* global describe, it */
const assert = require('assert');
const { extend } = require('..');

describe('Extend Test', () => {
  it('should extend and then override configs props', async () => {
    const cfg1 = {
      input: {
        name: 'test'
      },
      output: [{
        dir: 'assets/umd',
        name: 'app'
      }]
    };
    const cfg2 = {
      input: {
        name: 'test2'
      },
      output: [{
        dir: 'assets/cjs',
        name: 'app'
      }]
    };
    const mergedCfg = {
      input: {
        name: 'test2'
      },
      output: [{
        dir: 'assets/cjs',
        name: 'app'
      }]
    };

    assert.deepEqual(extend(cfg1, cfg2), mergedCfg);
  });
});
