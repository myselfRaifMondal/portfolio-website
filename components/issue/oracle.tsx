'use client';

import { useRef, useState } from 'react';
import styles from './issue.module.css';

const MAXIMS = [
  { text: 'Nothing in excess.', source: 'Inscribed at the Temple of Apollo, Delphi' },
  { text: 'Wealth is what time does to good decisions.', source: 'Raif Mondal' },
  { text: 'It is not the man who has too little, but the man who craves more, that is poor.', source: 'Seneca, Letters to Lucilius, II' },
  { text: 'Fortune is not a strategy.', source: 'Raif Mondal' },
  { text: 'Know thyself.', source: 'Inscribed at the Temple of Apollo, Delphi' },
  { text: 'Give a pledge, and ruin is near.', source: 'Delphic maxim, on lending one’s name' },
  { text: 'The market pays for knowing something it does not.', source: 'Raif Mondal' },
  { text: 'Call no man happy until he is dead.', source: 'Solon, as told by Herodotus' },
  { text: 'Fortune favours the bold.', source: 'Terence, Phormio. Tyche would add: and forgives no one.' },
  { text: 'No man ever steps in the same river twice.', source: 'Attributed to Heraclitus. Nor in the same market.' },
  { text: 'Slow and steady wins the race.', source: 'Aesop, The Tortoise and the Hare' },
  { text: 'I will not have fun until I deserve to have fun.', source: 'Raif Mondal' },
];

/** Draw a maxim at random, never the same one twice in a row. */
export function Oracle() {
  const [i, setI] = useState(0);
  const [drawn, setDrawn] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draw = () => {
    if (timer.current) clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setI((prev) => {
        let next = prev;
        while (next === prev) next = Math.floor(Math.random() * MAXIMS.length);
        return next;
      });
      setDrawn((d) => d + 1);
      setFading(false);
    }, 450);
  };

  const m = MAXIMS[i];
  return (
    <div>
      <blockquote className={styles.maxim} data-fading={fading} aria-live="polite">
        “{m.text}”
      </blockquote>
      <div className={styles.maximSource}>{m.source}</div>
      <div className={styles.oracleActions}>
        <button type="button" className={styles.drawButton} onClick={draw}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="none" stroke="currentColor" />
          </svg>
          Consult the oracle
        </button>
        <span className={styles.drawCount}>
          {drawn === 0 ? `${MAXIMS.length} maxims in the urn` : `Drawn ${drawn} ${drawn === 1 ? 'time' : 'times'}`}
        </span>
      </div>
    </div>
  );
}
