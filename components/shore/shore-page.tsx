'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type MouseEvent, type ReactNode } from 'react';
import { EarthGlobe } from '@/components/shore/earth-globe';
import { ContactModal } from '@/components/shore/contact-modal';
import styles from './shore.module.css';

const NAV_ITEMS = [
  { label: 'Intro', href: '#intro' },
  { label: 'Mission', href: '#mission' },
  { label: 'Systems', href: '#systems' },
  { label: 'Stack', href: '#stack' },
  { label: 'Roadmap', href: '#roadmap' },
];

const MISSION_PILLARS = [
  {
    num: '01',
    title: 'Long-horizon systems',
    body: 'Architected for compounding performance over market cycles, not short-term signal noise.',
  },
  {
    num: '02',
    title: 'Research before deployment',
    body: 'Every production capability originates in controlled experimentation and adversarial validation.',
  },
  {
    num: '03',
    title: 'Reliability as strategy',
    body: 'Operational resilience, observability, and risk controls are treated as first-class alpha enablers.',
  },
];

const VISION_COLUMNS = [
  {
    tag: 'OBSERVE',
    title: 'Observation layer',
    body: 'Microstructure-aware data surfaces capture market state transitions at execution-relevant granularity.',
  },
  {
    tag: 'REASON',
    title: 'Inference layer',
    body: 'Multi-horizon models synthesize cross-regime behavior into probabilistic decision hypotheses.',
  },
  {
    tag: 'EXECUTE',
    title: 'Action layer',
    body: 'Execution engines optimize deployment under latency, slippage, and risk constraints in real time.',
  },
];

const SYSTEMS = [
  {
    code: 'A—01',
    title: 'Signal Formation Engine',
    body: 'Structured research programs exploring cross-horizon alpha motifs, regime behavior, and structural inefficiencies.',
    status: 'Active',
  },
  {
    code: 'A—02',
    title: 'Execution Intelligence Stack',
    body: 'Execution policy experiments balancing spread capture, impact minimization, and latency-aware routing logic.',
    status: 'Active',
  },
  {
    code: 'A—03',
    title: 'Risk-Adaptive Control Layer',
    body: 'Dynamic controls for drawdown containment, exposure shaping, and strategy interruption under adverse regimes.',
    status: 'Active',
  },
  {
    code: 'X—01',
    title: 'Adaptive Regime Mapping',
    body: 'Probabilistic regime boundaries updated from order-flow asymmetry and volatility state transitions.',
    status: 'Experimental',
  },
];

const STACK_LAYERS = [
  { tag: 'L1', title: 'Data acquisition', body: 'Tick, depth, and event streams normalized into versioned research datasets.' },
  { tag: 'L2', title: 'Feature & signal fabric', body: 'Reusable transformations, diagnostics, and hypothesis pipelines across strategies.' },
  { tag: 'L3', title: 'Model research runtime', body: 'Controlled training, evaluation, and stress testing with reproducible experiment state.' },
  { tag: 'L4', title: 'Execution & risk engine', body: 'Latency-aware routing, allocation policy, and real-time risk interruption controls.' },
];

const ROADMAP_PHASES = [
  { tag: 'PHASE I · CURRENT', body: 'Consolidating research infrastructure and production-grade observability across core signal pipelines.' },
  { tag: 'PHASE II · NEAR-TERM', body: 'Deploying adaptive execution intelligence with expanded multi-asset microstructure diagnostics.' },
  { tag: 'PHASE III · LONG-TERM', body: 'Advancing autonomous allocation systems with institutional governance and scenario-contingent controls.' },
];

const monoLabel: CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--shore-muted)',
};

function Reveal({
  as: Tag = 'div',
  kind,
  delay,
  className,
  style,
  children,
}: {
  as?: ElementType;
  kind: 'fade' | 'up';
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const Element = Tag as 'div';
  return (
    <Element data-reveal={kind} data-delay={delay} className={className} style={style}>
      {children}
    </Element>
  );
}

function RevealLineWrap({ delay, style, tight, children }: { delay?: number; style?: CSSProperties; tight?: boolean; children: ReactNode }) {
  return (
    <span
      style={{
        display: 'block',
        overflow: 'hidden',
        ...(tight ? { padding: '0.12em 0', margin: '-0.12em 0' } : undefined),
      }}
    >
      <span data-reveal="line" data-delay={delay} style={{ display: 'block', ...style }}>
        {children}
      </span>
    </span>
  );
}

export function ShorePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderInnerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const roadRef = useRef<HTMLElement>(null);
  const roadFillRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<(() => void) | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    function setupReveals() {
      if (!root) return;
      const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
      els.forEach((el) => {
        const kind = el.getAttribute('data-reveal');
        el.style.opacity = '0';
        if (kind === 'line') el.style.transform = 'translateY(102%)';
        else if (kind === 'up') el.style.transform = 'translateY(16px)';
      });
      if (reducedMotion || document.hidden) {
        els.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        return;
      }
      const play = (el: HTMLElement) => {
        const d = parseInt(el.getAttribute('data-delay') || '0', 10);
        el.style.transition = `opacity 1s ease ${d}ms, transform 1.1s cubic-bezier(.16,1,.3,1) ${d}ms`;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }, 16);
      };
      const pending = els.map((el) => ({
        el,
        watch: el.getAttribute('data-reveal') === 'line' && el.parentElement ? el.parentElement : el,
      }));
      const sweep = () => {
        for (let i = pending.length - 1; i >= 0; i--) {
          const r = pending[i].watch.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
            play(pending[i].el);
            pending.splice(i, 1);
          }
        }
      };
      sweepRef.current = sweep;
      sweep();
      setTimeout(sweep, 180);
      const poll = setInterval(() => {
        if (!pending.length) clearInterval(poll);
        else sweep();
      }, 400);
      const onResize = () => sweep();
      window.addEventListener('resize', onResize, { passive: true });
      cleanups.push(() => {
        clearInterval(poll);
        window.removeEventListener('resize', onResize);
      });
    }

    function runLoader() {
      const start = Date.now();
      const FILL = 1400;
      const id = setInterval(() => {
        const t = Math.min((Date.now() - start) / FILL, 1);
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const p = Math.round(e * 100);
        if (fillRef.current) fillRef.current.style.width = p + '%';
        if (countRef.current) countRef.current.textContent = String(p).padStart(3, '0');
        if (t >= 1) {
          clearInterval(id);
          exitLoader();
        }
      }, 32);
      const failsafe = setTimeout(() => {
        clearInterval(id);
        exitLoader();
      }, 2500);
      cleanups.push(() => {
        clearInterval(id);
        clearTimeout(failsafe);
      });
    }

    let exited = false;
    function exitLoader() {
      if (exited) return;
      exited = true;
      const l = loaderRef.current;
      const inner = loaderInnerRef.current;
      if (inner) {
        inner.style.transition = 'opacity .5s ease, transform .6s ease';
        inner.style.opacity = '0';
        inner.style.transform = 'translateY(-10px)';
      }
      if (l) {
        l.style.transition = 'opacity .7s ease';
        l.style.opacity = '0';
      }
      setTimeout(() => {
        if (l) l.style.display = 'none';
        document.documentElement.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow');
        setupReveals();
      }, 700);
    }

    try {
      window.scrollTo(0, 0);
    } catch {}
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    runLoader();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      sweepRef.current?.();
      const roadEl = roadRef.current;
      if (roadEl && roadFillRef.current) {
        const r = roadEl.getBoundingClientRect();
        const rp = Math.min(Math.max((window.innerHeight * 0.8 - r.top) / Math.max(r.height * 0.7, 1), 0), 1);
        roadFillRef.current.style.width = (rp * 100).toFixed(1) + '%';
        roadEl.querySelectorAll<HTMLElement>('[data-phase]').forEach((el) => {
          const i = parseInt(el.getAttribute('data-phase') || '0', 10);
          el.style.opacity = rp > (i + 0.3) / 3.2 ? '1' : '0.4';
        });
      }
      const links = rootRef.current ? rootRef.current.querySelectorAll<HTMLElement>('[data-navlink]') : [];
      let active = '';
      ['intro', 'mission', 'systems', 'stack', 'roadmap'].forEach((id) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.42) active = id;
      });
      links.forEach((a) => {
        const on = (a.getAttribute('href') || '') === '#' + active;
        a.classList.toggle(styles.navLinkActive, on);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') || '';
    if (href.indexOf('#') !== 0) return;
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + (window.scrollY || 0) - 70, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--paper)',
        color: 'var(--ink)',
        fontFamily: 'var(--serif)',
        overflowX: 'hidden',
      }}
    >
      <a href="#intro" className={styles.skipLink}>
        Skip to content
      </a>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(21,24,27,0.055) 1px, transparent 1px),linear-gradient(to bottom, rgba(21,24,27,0.055) 1px, transparent 1px)',
          backgroundSize: 'min(16.6vw,240px) min(16.6vw,240px)',
        }}
      />

      <div
        ref={loaderRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          background: 'var(--paper)',
        }}
      >
        <div ref={loaderInnerRef} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(34px,5vw,58px)', letterSpacing: '-0.02em', color: 'var(--sea)' }}>
            Raif Mondal
          </div>
          <div style={{ marginTop: 8, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--shore-muted)' }}>
            Autonomous quantitative intelligence
          </div>
        </div>
        <div style={{ width: 'min(280px,66vw)', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--shore-muted)' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }}>
            <div ref={fillRef} style={{ height: 1, width: '0%', background: 'var(--sea)' }} />
          </div>
          <span ref={countRef} style={{ color: 'var(--ink)' }}>
            000
          </span>
        </div>
      </div>

      <header style={{ position: 'fixed', insetInline: 0, top: 0, zIndex: 60, padding: '20px 28px', background: 'linear-gradient(to bottom, var(--paper) 60%, transparent)' }}>
        <div style={{ maxWidth: 1320, marginInline: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px 28px' }}>
          <a href="#intro" onClick={onNavClick} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Raif Mondal</span>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--shore-muted)' }}>IndiQuant</span>
          </a>
          <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 26, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.04em' }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavClick}
                data-navlink
                className={`${styles.navLink} ${item.href === '#intro' ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="https://calendar.app.google/pG5Qv3GQFFZvej3h7" target="_blank" rel="noopener" className={styles.underlineLink} style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>
            Book a meeting
          </a>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <section id="intro" style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 28px 60px' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto', width: '100%', textAlign: 'center' }}>
            <Reveal kind="fade" style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--shore-muted)' }}>
              Founder &amp; CEO · IndiQuant
            </Reveal>
            <div style={{ position: 'relative', marginTop: 'clamp(18px,3vw,34px)' }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 'clamp(58px,15vw,215px)', lineHeight: 0.86, letterSpacing: '-0.035em', color: 'var(--sea)' }}>
                <RevealLineWrap tight>RAIF</RevealLineWrap>
                <RevealLineWrap tight delay={120}>
                  MONDAL
                </RevealLineWrap>
              </h1>
            </div>
            <Reveal
              as="p"
              kind="up"
              delay={260}
              style={{ margin: 'clamp(20px,3vw,34px) auto 0', maxWidth: '62ch', fontStyle: 'italic', fontSize: 'clamp(16px,1.5vw,21px)', lineHeight: 1.55, color: 'var(--shore-muted)' }}
            >
              I build autonomous quantitative intelligence systems for institutional capital markets through IndiQuant, with a focus on deep
              research infrastructure, risk-aware execution, and long-horizon system design.
            </Reveal>
            <Reveal kind="up" delay={340} style={{ marginTop: 34, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 22, fontFamily: 'var(--mono)', fontSize: 12.5, letterSpacing: '0.04em' }}>
              <button type="button" onClick={() => setModalOpen(true)} className={styles.plainButton} style={{ fontSize: 'inherit' }}>
                Write to me
              </button>
              <a href="mailto:raifmondal@indiquantresearch.in" className={styles.underlineLink}>
                raifmondal@indiquantresearch.in
              </a>
            </Reveal>
          </div>
          <Reveal
            kind="fade"
            delay={500}
            style={{
              maxWidth: 1320,
              margin: 'clamp(40px,7vw,90px) auto 0',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 12,
              borderTop: '1px solid var(--rule)',
              paddingTop: 14,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--shore-muted)',
            }}
          >
            <span>Quantitative AI</span>
            <span>Market microstructure</span>
            <span>Phase I · Active</span>
          </Reveal>
        </section>

        <section id="mission" style={{ padding: 'clamp(70px,10vw,140px) 28px 0' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto' }}>
            <SectionKicker num="01" label="Institutional mission" />
            <h2 style={{ margin: 'clamp(30px,4vw,56px) 0 0', maxWidth: '19ch', fontWeight: 300, fontSize: 'clamp(30px,5vw,72px)', lineHeight: 1.06, letterSpacing: '-0.03em' }}>
              <RevealLineWrap>Building IndiQuant means</RevealLineWrap>
              <RevealLineWrap delay={90}>building research infrastructure</RevealLineWrap>
              <RevealLineWrap delay={180} style={{ fontStyle: 'italic', color: 'var(--sea)' }}>
                for autonomous intelligence.
              </RevealLineWrap>
            </h2>
            <div style={{ marginTop: 'clamp(32px,4vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(28px,4vw,64px)' }}>
              <div>
                <EarthGlobe
                  className={styles.bob}
                  style={{ width: 'min(70%, 260px)', aspectRatio: '1', marginBottom: 26 }}
                />
                <Reveal as="p" kind="up" style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: 'var(--shore-muted)' }}>
                  My mandate is precise: design machine-native systems that can observe, reason, and execute across dynamic capital markets
                  with institutional discipline.
                </Reveal>
              </div>
              <div>
                {MISSION_PILLARS.map((pillar, i) => (
                  <Reveal key={pillar.num} kind="up" delay={i * 60 + 80} className={styles.pillarRow}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--sea)' }}>{pillar.num}</div>
                    <div style={{ marginTop: 8, fontSize: 20, letterSpacing: '-0.01em' }}>{pillar.title}</div>
                    <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--shore-muted)' }}>{pillar.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="vision" style={{ padding: 'clamp(70px,10vw,140px) 28px 0' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto' }}>
            <SectionKicker num="02" label="Research vision" />
            <h2 style={{ margin: 'clamp(30px,4vw,56px) 0 clamp(30px,4vw,56px)', maxWidth: '24ch', fontWeight: 300, fontSize: 'clamp(26px,3.6vw,52px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              <RevealLineWrap>I treat market intelligence as a systems</RevealLineWrap>
              <RevealLineWrap delay={90}>problem, not a single-model problem.</RevealLineWrap>
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 0, borderTop: '1px solid var(--rule)' }}>
              {VISION_COLUMNS.map((col, i) => (
                <Reveal
                  as="li"
                  key={col.tag}
                  kind="up"
                  delay={i * 90}
                  style={{
                    padding: i === 0 ? '26px 26px 34px 0' : i === VISION_COLUMNS.length - 1 ? '26px 0 34px 26px' : '26px',
                    borderRight: i < VISION_COLUMNS.length - 1 ? '1px solid var(--rule)' : undefined,
                  }}
                >
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--sea)' }}>{col.tag}</div>
                  <div style={{ marginTop: 14, fontSize: 'clamp(20px,2.1vw,26px)', letterSpacing: '-0.015em' }}>{col.title}</div>
                  <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--shore-muted)' }}>{col.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="systems" style={{ padding: 'clamp(70px,10vw,140px) 28px 0' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto' }}>
            <SectionKicker num="03" label="Active research systems" />
            <ul style={{ listStyle: 'none', margin: 'clamp(28px,4vw,52px) 0 0', padding: 0 }}>
              {SYSTEMS.map((sys, i) => (
                <Reveal as="li" key={sys.code} kind="up" delay={i * 70} className={styles.systemRow} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '12px 28px' }}>
                  <span style={{ flex: 'none', width: 44, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sea)' }}>{sys.code}</span>
                  <span style={{ flex: '1 1 240px', minWidth: 240, fontSize: 'clamp(22px,2.6vw,34px)', fontWeight: 300, letterSpacing: '-0.02em' }}>{sys.title}</span>
                  <span style={{ flex: '1 1 300px', maxWidth: 400, fontSize: 15, lineHeight: 1.6, color: 'var(--shore-muted)' }}>{sys.body}</span>
                  <span style={{ flex: 'none', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--shore-muted)' }}>{sys.status}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="stack" style={{ padding: 'clamp(70px,10vw,140px) 28px 0' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto' }}>
            <SectionKicker num="04" label="Quantitative infrastructure" />
            <h2 style={{ margin: 'clamp(30px,4vw,56px) 0 clamp(26px,3vw,44px)', maxWidth: '20ch', fontWeight: 300, fontSize: 'clamp(26px,3.6vw,52px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              <RevealLineWrap>A modular stack engineered for research</RevealLineWrap>
              <RevealLineWrap delay={90} style={{ fontStyle: 'italic' }}>
                velocity and production reliability.
              </RevealLineWrap>
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '0 clamp(24px,3vw,48px)' }}>
              {STACK_LAYERS.map((layer, i) => (
                <Reveal as="li" key={layer.tag} kind="up" delay={i * 70} style={{ borderTop: '1px solid var(--rule)', padding: '22px 0' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--sea)' }}>{layer.tag}</div>
                  <div style={{ marginTop: 10, fontSize: 21 }}>{layer.title}</div>
                  <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--shore-muted)' }}>{layer.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="roadmap" ref={roadRef} style={{ padding: 'clamp(70px,10vw,140px) 28px clamp(80px,12vw,160px)' }}>
          <div style={{ maxWidth: 1320, marginInline: 'auto' }}>
            <SectionKicker num="05" label="Research timeline" />
            <h2 style={{ margin: 'clamp(30px,4vw,56px) 0 0', maxWidth: '22ch', fontWeight: 300, fontSize: 'clamp(26px,3.6vw,52px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              <RevealLineWrap>My roadmap is built around capability</RevealLineWrap>
              <RevealLineWrap delay={90} style={{ fontStyle: 'italic' }}>
                maturation, not launch theatrics.
              </RevealLineWrap>
            </h2>
            <div style={{ marginTop: 'clamp(32px,4vw,56px)', height: 1, background: 'var(--rule)' }}>
              <div ref={roadFillRef} style={{ height: 1, width: '0%', background: 'var(--sea)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '0 clamp(24px,3vw,48px)' }}>
              {ROADMAP_PHASES.map((phase, i) => (
                <div key={phase.tag} data-phase={i} style={{ padding: '24px 0', opacity: 0.4, transition: 'opacity .6s ease' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--sea)' }}>{phase.tag}</div>
                  <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.6 }}>{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,9vw,120px) 28px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 1320, marginInline: 'auto', width: '100%' }}>
          <SectionKicker num="06" label="Contact / network" />
          <h2 style={{ margin: 'clamp(30px,4vw,56px) 0 0', maxWidth: '16ch', fontWeight: 300, fontSize: 'clamp(32px,6vw,88px)', lineHeight: 1.02, letterSpacing: '-0.035em', color: 'var(--sea)' }}>
            <RevealLineWrap>Let&apos;s talk research,</RevealLineWrap>
            <RevealLineWrap delay={100} style={{ fontStyle: 'italic' }}>
              capital and systems.
            </RevealLineWrap>
          </h2>
          <Reveal as="p" kind="up" delay={160} style={{ margin: '26px 0 0', maxWidth: '52ch', fontSize: 16.5, lineHeight: 1.62, color: 'var(--shore-muted)' }}>
            I welcome serious dialogue with institutional partners, domain researchers, and operators focused on the next generation of
            quantitative market intelligence.
          </Reveal>
          <Reveal kind="up" delay={220} style={{ marginTop: 34, display: 'flex', flexWrap: 'wrap', gap: '12px 26px', fontFamily: 'var(--mono)', fontSize: 13 }}>
            <button type="button" onClick={() => setModalOpen(true)} className={styles.plainButton} style={{ fontSize: 'inherit' }}>
              Write to me
            </button>
            <a href="https://calendar.app.google/pG5Qv3GQFFZvej3h7" target="_blank" rel="noopener" className={styles.underlineLink}>
              Book a meeting
            </a>
            <a href="https://linkedin.com/in/raifmondal" target="_blank" rel="noopener" className={styles.underlineLink}>
              LinkedIn
            </a>
            <a href="https://github.com/myselfRaifMondal" target="_blank" rel="noopener" className={styles.underlineLink}>
              GitHub
            </a>
          </Reveal>
        </div>
        <div
          style={{
            maxWidth: 1320,
            margin: '60px auto 0',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
            padding: '16px 0',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            color: 'var(--shore-muted)',
          }}
        >
          <span>© 2026 Raif Mondal</span>
          <span>Founder, IndiQuant</span>
        </div>
      </footer>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}

function SectionKicker({ num, label }: { num: string; label: string }) {
  return (
    <Reveal kind="fade" style={{ ...monoLabel, display: 'flex', alignItems: 'baseline', gap: 16, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
      <span>{num}</span>
      <span>{label}</span>
    </Reveal>
  );
}
