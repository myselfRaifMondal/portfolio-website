// Small, dependency-free maths for the research-note interactives.

/** Standard normal CDF via the Abramowitz & Stegun 7.1.26 erf approximation (error < 1.5e-7). */
export function normCdf(x: number) {
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * z);
  const erf = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-z * z);
  return x >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

export const normPdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);

/** Black-Scholes price and Greeks for a European option on a non-dividend stock. T in years, r and sigma annualised. */
export function blackScholes(S: number, K: number, T: number, r: number, sigma: number) {
  const sqT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqT);
  const d2 = d1 - sigma * sqT;
  const disc = Math.exp(-r * T);
  return {
    call: S * normCdf(d1) - K * disc * normCdf(d2),
    put: K * disc * normCdf(-d2) - S * normCdf(-d1),
    callDelta: normCdf(d1),
    putDelta: normCdf(d1) - 1,
    gamma: normPdf(d1) / (S * sigma * sqT),
    vega: (S * normPdf(d1) * sqT) / 100, // per 1 vol point
    callTheta: (-(S * normPdf(d1) * sigma) / (2 * sqT) - r * K * disc * normCdf(d2)) / 365, // per calendar day
  };
}

/** Deterministic PRNG (mulberry32) so server and browser draw the same path. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draws via Box-Muller. */
export function normals(n: number, seed: number) {
  const u = rng(seed);
  return Array.from({ length: n }, () => Math.sqrt(-2 * Math.log(1 - u())) * Math.cos(2 * Math.PI * u()));
}

/** Equity curve from daily strategy returns scaled by position size; returns the curve and its maximum drawdown. */
export function equityCurve(shocks: number[], dailyEdge: number, dailyVol: number, size: number) {
  let eq = 1;
  let peak = 1;
  let maxDd = 0;
  const curve = [1];
  for (const z of shocks) {
    eq *= Math.max(1 + size * (dailyEdge + dailyVol * z), 0);
    peak = Math.max(peak, eq);
    maxDd = Math.max(maxDd, 1 - eq / peak);
    curve.push(eq);
  }
  return { curve, maxDd, final: eq };
}
