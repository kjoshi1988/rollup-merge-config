/* global describe, it */
const assert = require('assert');
const merge = require('..');

describe('Merge Test', () => {
  it('should append configs props', async () => {
    const cfg1 = {
      input: 'test',
      output: [
        {
          dir: 'assets/umd',
          name: 'app'
        }
      ]
    };
    const cfg2 = {
      output: [
        {
          dir: 'assets/cjs',
          name: 'app'
        }
      ]
    };
    const mergedCfg = {
      input: 'test',
      output: [
        {
          dir: 'assets/umd',
          name: 'app'
        },
        {
          dir: 'assets/cjs',
          name: 'app'
        }
      ]
    };

    assert.deepEqual(merge(cfg1, cfg2), mergedCfg);
  });
});
