'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './issue.module.css';

const MAXIMS = [
  { text: 'Nothing in excess.', source: 'Inscribed at the Temple of Apollo, Delphi' },
  { text: 'Size the position so that being wrong is boring.', source: 'Mine' },
  { text: 'It is not the man who has too little, but the man who craves more, that is poor.', source: 'Seneca, Letters to Lucilius, II' },
  { text: 'A rule you break once is only a suggestion.', source: 'Mine' },
  { text: 'Know thyself.', source: 'Inscribed at the Temple of Apollo, Delphi' },
  { text: 'The trade you did not take costs nothing to explain.', source: 'Mine' },
  { text: 'Give a pledge, and ruin is near.', source: 'Delphic maxim, on lending one’s name' },
  { text: 'Most edges are patience that someone else ran out of.', source: 'Mine' },
  { text: 'Call no man happy until he is dead.', source: 'Solon, as told by Herodotus' },
  { text: 'Leave the table while leaving is still your choice.', source: 'Mine' },
  { text: 'No man ever steps in the same river twice.', source: 'Attributed to Heraclitus' },
];

/** Draw a maxim at random, never the same one twice in a row. */
export function Oracle() {
  const [i, setI] = useState(0);
  const [drawn, setDrawn] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const draw = () => {
    if (timer.current) clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      // any maxim except the current one
      setI((prev) => (prev + 1 + Math.floor(Math.random() * (MAXIMS.length - 1))) % MAXIMS.length);
      setDrawn((d) => d + 1);
      setFading(false);
    }, 450);
  };

  const m = MAXIMS[i];
  return (
    <div>
      <div aria-live="polite" aria-atomic="true">
        <blockquote className={styles.maxim} data-fading={fading}>
          “{m.text}”
        </blockquote>
        <div className={styles.maximSource}>{m.source}</div>
      </div>
      <div className={styles.oracleActions}>
        <button type="button" className={styles.drawButton} onClick={draw}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="none" stroke="currentColor" />
          </svg>
          Draw a maxim
        </button>
        <span className={styles.drawCount}>
          {drawn === 0 ? `${MAXIMS.length} maxims in the urn` : `Drawn ${drawn} ${drawn === 1 ? 'time' : 'times'}`}
        </span>
      </div>
    </div>
  );
}
