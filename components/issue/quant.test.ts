import assert from 'node:assert/strict';
import { blackScholes, normCdf, normals, equityCurve } from './quant.ts';
const close = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} vs ${b}`);
close(normCdf(0), 0.5, 1e-7); close(normCdf(1.96), 0.975, 1e-4); close(normCdf(-1), 0.158655, 1e-5);
const o = blackScholes(100, 100, 1, 0.05, 0.2);
close(o.call, 10.4506, 1e-3); close(o.put, 5.5735, 1e-3); close(o.callDelta, 0.6368, 1e-3); close(o.gamma, 0.01876, 1e-4);
close(o.call - o.put, 100 - 100 * Math.exp(-0.05), 1e-6); // put-call parity
const z = normals(5000, 7); const mean = z.reduce((a, b) => a + b) / z.length; const sd = Math.sqrt(z.reduce((a, b) => a + (b - mean) ** 2, 0) / z.length);
close(mean, 0, 0.05); close(sd, 1, 0.05);
assert.deepEqual(normals(3, 7), normals(3, 7));
const flat = equityCurve([0, 0, 0], 0, 0.01, 1); assert.equal(flat.maxDd, 0);
const dd = equityCurve([-10, 0], 0, 0.01, 1); close(dd.maxDd, 0.1, 1e-9);
console.log('quant ok');
