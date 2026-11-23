'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { Monogram, Rosette } from './engraving';
import { ContactDialog } from './contact-dialog';
import { Story } from './story';
import { Pantheon } from './pantheon';
import { Oracle } from './oracle';
import { BrassCursor } from './cursor';
import { useLyre } from './use-lyre';
import styles from './issue.module.css';

const EMAIL = 'raifmondal@indiquantresearch.in';
const CALENDLY = 'https://calendly.com/raifmondal';

// Section ids and the magazine page each one "starts on", shown in the running header.
const PAGES = [
  { id: 'cover', folio: '01' },
  { id: 'contents', folio: '02' },
  { id: 'story', folio: '04' },
  { id: 'pantheon', folio: '12' },
  { id: 'oracle', folio: '18' },
  { id: 'holdings', folio: '20' },
  { id: 'back', folio: '24' },
];

const TOC = [
  { page: '04', id: 'story', title: 'The 9:15 problem', dek: 'How a lecture clash became a fund. A feature in five chapters.' },
  { page: '12', id: 'pantheon', title: 'Four gods of money', dek: 'The principles I keep, struck as coins. Turn them over.' },
  { page: '18', id: 'oracle', title: 'Consult the oracle', dek: 'Maxims on money, old and new, drawn at random.' },
  { page: '20', id: 'holdings', title: 'Holdings', dek: 'What I am building, and its standing.' },
  { page: '24', id: 'back', title: 'Correspondence', dek: 'Write, meet, or follow along.' },
];

function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children }: { as?: ElementType; delay?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const El = Tag as 'div';
  return (
    <El data-reveal className={`${styles.reveal} ${className}`} style={{ ...style, ['--d' as string]: `${delay}ms` }}>
      {children}
    </El>
  );
}

function Opener({ page, label, right }: { page: string; label: string; right?: string }) {
  return (
    <Reveal className={`${styles.opener} ${styles.kicker}`}>
      <span>p. {page}</span>
      <span>{label}</span>
      <span>{right}</span>
    </Reveal>
  );
}

export function IssuePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [folio, setFolio] = useState('01');
  const [writing, setWriting] = useState(false);
  const lyre = useLyre();

  useEffect(() => {
    const els = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        if (!el.classList.contains(styles.revealed) && el.getBoundingClientRect().top < vh * 0.9) el.classList.add(styles.revealed);
      }
      let f = '01';
      for (const p of PAGES) {
        const s = document.getElementById(p.id);
        if (s && s.getBoundingClientRect().top < vh * 0.4) f = p.folio;
      }
      setFolio(f);
      const max = document.documentElement.scrollHeight - vh;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
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

  return (
    <div ref={rootRef} className={styles.root}>
      <a href="#contents" className={styles.skipLink}>
        Skip to contents
      </a>
      <BrassCursor />

      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <a href="#cover" className={styles.headerMark}>
            Raif Mondal
          </a>
          <span className={styles.folio} aria-label={`Page ${folio}`}>
            p. {folio} / 24
          </span>
          <div className={`${styles.headerRight} ${styles.kicker}`}>
            <a href="#contents">Contents</a>
            <button type="button" className={`${styles.textButton} ${styles.kicker}`} aria-pressed={lyre.on} onClick={lyre.toggle}>
              {lyre.on ? 'Sound on' : 'Sound'}
            </button>
          </div>
        </div>
        <div ref={progressRef} className={styles.progress} />
      </header>

      <main>
        {/* ---------- cover ---------- */}
        <section id="cover" className={styles.wrap}>
          <div className={`${styles.coverStrip} ${styles.kicker}`}>
            <span>Issue No. 22</span>
            <span>Navi Mumbai · Winter MMXXVI</span>
            <span>The Founder Issue</span>
          </div>
          <h1 className={styles.masthead}>
            <Reveal as="span" style={{ display: 'block' }}>
              Raif <em>Mondal</em>
            </Reveal>
          </h1>
          <div className={styles.coverGrid}>
            <Reveal delay={200}>
              <ul className={styles.coverLines}>
                {TOC.slice(0, 3).map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className={styles.coverLine}>
                      <span className={styles.kicker}>p. {t.page}</span>
                      <span className={styles.coverHead}>{t.title}</span>
                      <span className={styles.coverDek}>{t.dek}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className={styles.coverArt}>
              <Rosette className={styles.rosette}>
                <Monogram />
              </Rosette>
            </Reveal>
            <Reveal delay={300}>
              <p className={styles.coverThesis}>I build systems that trade, so that discipline never depends on mood.</p>
              <div className={styles.byline}>
                Founder &amp; CEO, IndiQuant. Twenty-two. Writing from Koparkhairane, Navi Mumbai.
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- contents ---------- */}
        <section id="contents" className={`${styles.wrap} ${styles.contents}`} aria-labelledby="contents-t">
          <Reveal>
            <div className={styles.kicker}>In this issue</div>
            <h2 id="contents-t" className={styles.bigTitle}>
              Con&shy;tents<em>.</em>
            </h2>
          </Reveal>
          <ol className={styles.toc}>
            {TOC.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 90}>
                <a href={`#${t.id}`} className={styles.tocItem}>
                  <span className={styles.tocPage}>{t.page}</span>
                  <span className={styles.tocTitle}>{t.title}</span>
                  <span className={styles.tocDek}>{t.dek}</span>
                </a>
              </Reveal>
            ))}
          </ol>
        </section>

        <div className={styles.wrap}>
          <Opener page="04" label="The feature" right="Scroll to read" />
        </div>
        <Story />

        {/* ---------- pantheon ---------- */}
        <section id="pantheon" className={`${styles.wrap} ${styles.pantheon}`} aria-labelledby="pantheon-t">
          <Opener page="12" label="Principles" right="Hover or tap a coin" />
          <div className={styles.pantheonHead}>
            <Reveal as="h2" className={styles.bigTitle}>
              <span id="pantheon-t">
                Four gods <em>of money.</em>
              </span>
            </Reveal>
            <Reveal as="p" delay={150} className={styles.standfirst}>
              The Greeks gave wealth, wisdom, luck and the keeping of oaths each a god. I keep a principle for each. Every coin has the god on
              the face and the principle on the reverse.
            </Reveal>
          </div>
          <Pantheon />
        </section>

        {/* ---------- oracle ---------- */}
        <section id="oracle" className={styles.oracle} aria-labelledby="oracle-t">
          <div className={styles.wrap}>
            <div className={`${styles.opener} ${styles.kicker}`} style={{ borderTopColor: 'rgba(244,240,232,0.5)' }}>
              <span>p. 18</span>
              <span>The oracle</span>
              <span>Delphi, more or less</span>
            </div>
            <div className={styles.oracleGrid}>
              <div>
                <h2 id="oracle-t" className={styles.oracleTitle}>
                  Consult the <em>oracle.</em>
                </h2>
                <p className={styles.oracleLede}>Twelve maxims on money and judgement: some carved at Delphi, some written by Romans, some mine. Draw as many as you like.</p>
              </div>
              <Oracle />
            </div>
          </div>
        </section>

        {/* ---------- holdings & letters ---------- */}
        <section id="holdings" className={`${styles.wrap} ${styles.twoCol}`}>
          <div>
            <Opener page="20" label="Holdings" right="Standing" />
            <Reveal className={styles.holding} style={{ marginTop: 18 }}>
              <span className={styles.holdingName}>IndiQuant</span>
              <span className={`${styles.holdingStatus} ${styles.kicker}`}>Active</span>
              <span className={styles.holdingDek}>A quantitative fund, built on less capital and fewer people.</span>
            </Reveal>
            <Reveal delay={120} className={styles.holding}>
              <span className={styles.holdingName}>PlayMaker</span>
              <span className={`${styles.holdingStatus} ${styles.kicker}`}>Active</span>
              <span className={styles.holdingDek}>A high-frequency trading firm.</span>
            </Reveal>
          </div>
          <div id="letters">
            <Opener page="22" label="Letters" />
            <Reveal className={styles.letterCard}>
              <div className={styles.kicker}>Letter No. I · Forthcoming</div>
              <p>The first letter is being written. I would rather publish one considered letter than many quick ones.</p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- back cover ---------- */}
      <footer id="back" className={`${styles.wrap} ${styles.back}`}>
        <div className={styles.kicker}>p. 24 · Back page · A rule I keep</div>
        <Reveal as="p" className={styles.motto}>
          I will not have fun until I <em>deserve</em> to have fun.
        </Reveal>
        <div className={styles.backGrid}>
          <button type="button" className={styles.backLink} onClick={() => setWriting(true)}>
            <span className={styles.kicker}>Write</span>
            <span className={styles.backLinkTitle}>Send a note</span>
          </button>
          <a href={CALENDLY} target="_blank" rel="noopener" className={styles.backLink}>
            <span className={styles.kicker}>Meet</span>
            <span className={styles.backLinkTitle}>Book a meeting</span>
          </a>
          <a href="https://linkedin.com/in/raifmondal" target="_blank" rel="noopener" className={styles.backLink}>
            <span className={styles.kicker}>Follow</span>
            <span className={styles.backLinkTitle}>LinkedIn</span>
          </a>
          <a href="https://github.com/myselfRaifMondal" target="_blank" rel="noopener" className={styles.backLink}>
            <span className={styles.kicker}>Read the code</span>
            <span className={styles.backLinkTitle}>GitHub</span>
          </a>
        </div>
        <div className={`${styles.colophon} ${styles.kicker}`}>
          <span>© MMXXVI Raif Mondal</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>Set in Instrument Serif &amp; Sans</span>
        </div>
      </footer>

      <ContactDialog open={writing} onOpenChange={setWriting} />
    </div>
  );
}
