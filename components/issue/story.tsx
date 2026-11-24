'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './issue.module.css';

const CHAPTERS = [
  { no: 'I', name: 'Origins', lines: ['I grew up in a middle-class home in Koparkhairane, Navi Mumbai.', 'Nothing about it pointed towards markets.'] },
  {
    no: 'II',
    name: 'The 9:15 problem',
    lines: [
      'I found trading in a college dorm.',
      'The market opened at 9:15. So did my first lecture.',
      'I could not sit in both, so I taught a machine to sit in one of them.',
      'That was my first algorithm. It was not a good one. It was enough to take me deeper.',
    ],
  },
  {
    no: 'III',
    name: 'Two thousand applications',
    lines: [
      'I applied for quant internships more than two thousand times.',
      'Most never wrote back. One did.',
      'Lotus Capital took me on as a Quant Research Intern.',
    ],
  },
  {
    no: 'IV',
    name: 'IndiQuant',
    lines: [
      'Inside a fund, I saw how much capital and how many people it takes to run one.',
      'I believed it could be done with far less of both.',
      'When the internship ended, I started IndiQuant to prove it.',
    ],
  },
  {
    no: 'V',
    name: 'Twenty-two',
    lines: [
      'I am twenty-two.',
      'In most serious meetings I am the youngest person there, and I know how that is read.',
      'I do not argue with it. I let the work be read instead.',
    ],
  },
];

const FLAT = CHAPTERS.flatMap((c, ci) => c.lines.map((text, li) => ({ ci, li, text })));
const STEP_VH = 42; // scroll distance per sentence

/**
 * The story is read one sentence at a time: the stage stays pinned while the
 * reader scrolls, and each scroll step brings the next sentence into full ink.
 * Screen readers get the whole text at once from the hidden copy.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const travel = Math.max(r.height - window.innerHeight, 1);
      const p = Math.min(Math.max(-r.top / travel, 0), 0.9999);
      setIdx(Math.floor(p * FLAT.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const current = FLAT[idx];
  const chapter = CHAPTERS[current.ci];

  return (
    <section id="story" ref={ref} className={styles.story} style={{ height: `calc(${FLAT.length * STEP_VH}vh + 100svh)` }} aria-labelledby="story-t">
      <h2 id="story-t" className={styles.srOnly}>
        The feature: my story
      </h2>
      {/* Full text: read by screen readers, and shown as a plain article on short screens or with reduced motion. */}
      <div className={`${styles.srOnly} ${styles.storyArticle} ${styles.wrap}`}>
        {CHAPTERS.map((c) => (
          <div key={c.no} className={styles.articleChapter}>
            <h3 className={styles.articleHead}>
              {c.no}. {c.name}
            </h3>
            <p className={styles.articleText}>{c.lines.join(' ')}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.storyStage} ${styles.wrap}`} aria-hidden="true">
        <div>
          <div className={styles.kicker}>Chapter {chapter.no} of V</div>
          <div className={styles.storyChapterNo}>{chapter.no}</div>
          <div className={styles.storyChapterName}>{chapter.name}</div>
          <div className={styles.storyMeter}>
            {FLAT.map((_, i) => (
              <span key={i} data-on={i <= idx} />
            ))}
          </div>
        </div>
        <p className={styles.storyText}>
          {chapter.lines.map((line, li) => (
            <span key={`${current.ci}-${li}`} className={styles.sentence} data-state={li < current.li ? 'past' : li === current.li ? 'current' : 'future'}>
              {line}{' '}
            </span>
          ))}
        </p>
        <div className={`${styles.kicker} ${styles.storyHint}`}>{idx < FLAT.length - 1 ? 'Keep scrolling' : 'End of feature'}</div>
      </div>
    </section>
  );
}
