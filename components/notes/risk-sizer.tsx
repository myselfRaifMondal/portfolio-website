'use client';

import { useMemo, useState } from 'react';
import { equityCurve, normals } from '@/components/issue/quant';
import { Slider } from './option-pricer';
import styles from './article.module.css';

const DAYS = 750; // about three trading years
const EDGE = 0.0004; // a small positive expected daily return
const VOL = 0.011; // daily volatility of the strategy at 1x size
const W = 560;
const H = 220;

/** One strategy, one sequence of luck. Only the position size changes. */
export function RiskSizer() {
  const [size, setSize] = useState(1);
  const [seed, setSeed] = useState(22);
  const shocks = useMemo(() => normals(DAYS, seed), [seed]);
  const { curve, maxDd, final } = equityCurve(shocks, EDGE, VOL, size);

  // log scale fitted to the path, so a 1x and a 4x run are both readable
  const lo = Math.log(Math.max(Math.min(...curve, 0.7), 0.01));
  const hi = Math.log(Math.max(...curve, 1.3));
  const px = (i: number) => (i / DAYS) * W;
  const py = (v: number) => H - ((Math.log(Math.max(v, 0.01)) - lo) / (hi - lo)) * H;
  const d = curve.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join('');

  return (
    <figure className={styles.figure}>
      <div className={styles.figHead}>
        <span className={styles.kicker}>Interactive · Position sizing</span>
        <span className={styles.kicker}>Simulated, not a track record</span>
      </div>
      <div className={styles.pricerGrid}>
        <div className={styles.controls}>
          <Slider label="Position size" value={size} min={0.25} max={4} step={0.25} onChange={setSize} format={(v) => `${v.toFixed(2)}×`} />
          <button type="button" className={styles.reroll} onClick={() => setSeed((s) => s + 1)}>
            Draw a different three years
          </button>
          <dl className={styles.readout}>
            <div>
              <dt>Worst drawdown</dt>
              <dd>{(maxDd * 100).toFixed(1)}%</dd>
            </div>
            <div>
              <dt>Ending capital</dt>
              <dd>{final.toFixed(2)}×</dd>
            </div>
          </dl>
        </div>
        <div>
          <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Simulated capital over ${DAYS} trading days at ${size}× size: worst drawdown ${(maxDd * 100).toFixed(1)}%, ending at ${final.toFixed(2)} times the start.`}>
            <line x1="0" x2={W} y1={py(1)} y2={py(1)} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 4" />
            <path d={d} fill="none" stroke="var(--green)" strokeWidth="1.4" />
          </svg>
          <p className={styles.caption}>
            The same small daily edge and the same random days. Past a point, a bigger position does not earn more; it only makes the bad stretch deeper. Log scale; dashed line is the starting capital.
          </p>
        </div>
      </div>
    </figure>
  );
}
