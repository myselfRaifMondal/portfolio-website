'use client';

import { useState } from 'react';
import { Medallion } from './engraving';
import styles from './issue.module.css';

const COINS = [
  { god: 'Athena', legend: 'ΑΘΗΝΑ', emblem: 'owl', virtue: 'Knowledge', body: 'The market pays for knowing something it does not. Everything else is noise.' },
  { god: 'Plutus', legend: 'ΠΛΟΥΤΟΣ', emblem: 'cornucopia', virtue: 'Patience', body: 'Wealth is what time does to good decisions. I would rather compound quietly than be right loudly.' },
  { god: 'Tyche', legend: 'ΤΥΧΗ', emblem: 'wheel', virtue: 'Restraint', body: 'Fortune is not a strategy. Respect risk, survive, and play again tomorrow.' },
  { god: 'Zeus', legend: 'ΖΕΥΣ', emblem: 'thunderbolt', virtue: 'Character', body: 'The god of oaths. A name is the one asset that cannot be rebuilt, so I keep my word.' },
] as const;

/** Four coins; hover (or tap) turns each one over to show the principle struck on its reverse. */
export function Pantheon() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  return (
    <div className={styles.coins}>
      {COINS.map((c) => (
        <div key={c.god} className={styles.coinCell}>
          <button
            type="button"
            className={styles.coin}
            aria-pressed={!!flipped[c.god]}
            aria-label={`${c.god}, ${c.virtue}: ${c.body}`}
            onClick={() => setFlipped((f) => ({ ...f, [c.god]: !f[c.god] }))}
          >
            <span className={styles.coinInner}>
              <span className={styles.coinFace}>
                <Medallion legend={c.legend} emblem={c.emblem} />
              </span>
              <span className={styles.coinBack}>
                <span className={styles.coinVirtue}>{c.virtue}</span>
                <span className={styles.coinBody}>{c.body}</span>
              </span>
            </span>
          </button>
          <div className={styles.coinCaption}>
            <span className={styles.kicker}>{c.virtue}</span>
            <span className={styles.coinName}>{c.god}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
