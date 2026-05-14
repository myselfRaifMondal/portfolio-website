'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MarketMicrostructureMap } from '@/components/market-microstructure-map';

gsap.registerPlugin(ScrollTrigger);

export function ResearchVision() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vision-reveal',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 74%',
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vision" ref={rootRef} className="section-shell">
      <div className="content-shell relative overflow-hidden rounded-sm institution-grid">
        <MarketMicrostructureMap className="pointer-events-none absolute inset-x-0 top-8 z-0 h-[260px] opacity-60 md:h-[300px]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/35 to-black/70" />

        <div className="relative z-10 space-y-8 p-6 md:p-10">
          <p className="eyebrow vision-reveal">Research Vision</p>
          <h2 className="section-title vision-reveal max-w-4xl">
            I treat market intelligence as a systems problem, not a single-model problem.
          </h2>
          <p className="section-lead vision-reveal max-w-3xl">
            The objective is not to predict isolated events. It is to construct adaptive research loops where data ingestion, signal discovery, risk feedback, and execution policy evolve together.
          </p>

          <div className="vision-reveal grid gap-5 pt-3 md:grid-cols-3">
            <div className="institution-card">
              <p className="text-sm font-medium text-foreground">Observation Layer</p>
              <p className="mt-2 text-sm text-[#a8a8a3]">Microstructure-aware data surfaces capture market state transitions at execution-relevant granularity.</p>
            </div>
            <div className="institution-card">
              <p className="text-sm font-medium text-foreground">Inference Layer</p>
              <p className="mt-2 text-sm text-[#a8a8a3]">Multi-horizon models synthesize cross-regime behavior into probabilistic decision hypotheses.</p>
            </div>
            <div className="institution-card">
              <p className="text-sm font-medium text-foreground">Action Layer</p>
              <p className="mt-2 text-sm text-[#a8a8a3]">Execution engines optimize deployment under latency, slippage, and risk constraints in real time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
