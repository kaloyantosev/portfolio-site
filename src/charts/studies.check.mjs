// Self-check for the indicator maths: node src/charts/studies.check.mjs
import assert from 'node:assert/strict';
import { olsFit, sma, ema, rma, wma, stdev, highest, lowest } from './studies.js';

// A perfect line y = 10 + 2t (t oldest -> newest): slope per bar-ago is -2, value now 10 + 2*9, R² 1, no scatter.
const line = Array.from({ length: 10 }, (_, t) => 10 + 2 * t);
const f = olsFit(line, 10);
assert.ok(Math.abs(f.a - 28) < 1e-9 && Math.abs(f.b + 2) < 1e-9 && f.sigma < 1e-9 && Math.abs(f.r2 - 1) < 1e-9);

const x = [1, 2, 3, 4, 5];
assert.deepEqual(sma(x, 3), [null, null, 2, 3, 4]);
assert.deepEqual(wma(x, 3), [null, null, (1 + 4 + 9) / 6, (2 + 6 + 12) / 6, (3 + 8 + 15) / 6]);
assert.deepEqual(ema(x, 3), [null, null, 2, 3, 4]);               // linear input: EMA tracks the SMA seed
assert.deepEqual(rma([2, 2, 2, 5], 3), [null, null, 2, 3]);         // 2 + (5 - 2) / 3
assert.ok(Math.abs(stdev([2, 4, 4, 4, 5, 5, 7, 9], 8)[7] - 2) < 1e-12); // population σ = 2
assert.deepEqual(highest(x, 2), [null, 2, 3, 4, 5]);
assert.deepEqual(lowest(x, 2), [null, 1, 2, 3, 4]);
console.log('studies: all checks passed');
