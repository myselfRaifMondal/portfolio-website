'use client';

import { useId, useState } from 'react';
import { blackScholes } from '@/components/issue/quant';
import styles from './article.module.css';

const W = 560;
const H = 220;

/** Drag the inputs; prices, Greeks and the value curve update live. */
export function OptionPricer() {
  const [S, setS] = useState(100);
  const [K, setK] = useState(100);
  const [vol, setVol] = useState(20);
  const [days, setDays] = useState(90);
  const [rate, setRate] = useState(6.5);
  const T = days / 365;
  const r = rate / 100;
  const o = blackScholes(S, K, T, r, vol / 100);

  // call value and its expiry payoff across spot 50..150
  const xs = Array.from({ length: 101 }, (_, i) => 50 + i);
  const maxY = 60;
  const px = (s: number) => ((s - 50) / 100) * W;
  const py = (v: number) => H - (Math.min(v, maxY) / maxY) * H;
  const value = xs.map((s, i) => `${i ? 'L' : 'M'}${px(s).toFixed(1)} ${py(blackScholes(s, K, T, r, vol / 100).call).toFixed(1)}`).join('');
  const payoff = `M0 ${H} L${px(K).toFixed(1)} ${H} L${W} ${py(150 - K).toFixed(1)}`;

  return (
    <figure className={styles.figure}>
      <div className={styles.figHead}>
        <span className={styles.kicker}>Interactive · Black-Scholes</span>
        <span className={styles.kicker}>European option, no dividends</span>
      </div>
      <div className={styles.pricerGrid}>
        <div className={styles.controls}>
          <Slider label="Spot price" value={S} min={50} max={150} step={1} onChange={setS} format={(v) => v.toFixed(0)} />
          <Slider label="Strike" value={K} min={50} max={150} step={1} onChange={setK} format={(v) => v.toFixed(0)} />
          <Slider label="Volatility" value={vol} min={5} max={80} step={1} onChange={setVol} format={(v) => `${v}%`} />
          <Slider label="Days to expiry" value={days} min={1} max={365} step={1} onChange={setDays} format={(v) => `${v}`} />
          <Slider label="Risk-free rate" value={rate} min={0} max={12} step={0.25} onChange={setRate} format={(v) => `${v.toFixed(2)}%`} />
        </div>
        <div>
          <dl className={styles.readout}>
            <div>
              <dt>Call</dt>
              <dd>{o.call.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Put</dt>
              <dd>{o.put.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Delta (call)</dt>
              <dd>{o.callDelta.toFixed(3)}</dd>
            </div>
            <div>
              <dt>Gamma</dt>
              <dd>{o.gamma.toFixed(4)}</dd>
            </div>
            <div>
              <dt>Vega / vol pt</dt>
              <dd>{o.vega.toFixed(3)}</dd>
            </div>
            <div>
              <dt>Theta / day</dt>
              <dd>{o.callTheta.toFixed(3)}</dd>
            </div>
          </dl>
          <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Call value across spot prices from 50 to 150, strike ${K}. At spot ${S} the call is worth ${o.call.toFixed(2)}.`}>
            <path d={payoff} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="4 4" />
            <path d={value} fill="none" stroke="var(--green)" strokeWidth="1.6" />
            <line x1={px(S)} x2={px(S)} y1="0" y2={H} stroke="currentColor" strokeOpacity="0.25" />
            <circle cx={px(S)} cy={py(o.call)} r="4" fill="var(--green)" />
          </svg>
          <p className={styles.caption}>Green: call value today. Dashed: what it pays at expiry. The gap between them is time value.</p>
        </div>
      </div>
    </figure>
  );
}

export function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const id = useId();
  return (
    <div className={styles.slider}>
      <label htmlFor={id} className={styles.sliderLabel}>
        <span>{label}</span>
        <output htmlFor={id}>{format(value)}</output>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
