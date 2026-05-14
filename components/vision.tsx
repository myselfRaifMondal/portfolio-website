'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: false,
          },
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: false,
          },
          ease: 'power2.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: false,
          },
          ease: 'power2.out',
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
      <div className="absolute inset-0 data-grid pointer-events-none opacity-20" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            <span className="text-foreground">My Vision for</span>
            <br />
            <span className="gradient-text">the Next Decade</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={leftRef} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Autonomous Capital Deployment</h3>
              <p className="text-muted-foreground leading-relaxed">
                By 2030, the majority of quantitative capital will be deployed by AI systems operating autonomously. IndiQuant is built for this future—systems that learn, adapt, and execute across market regimes without human bottlenecks.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">AI-Native Finance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deep learning will discover market structures that quantitative researchers have been blind to for decades. The competitive moat won't be mathematical—it will be computational. The ability to build and iterate faster.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Indian Market Dominance</h3>
              <p className="text-muted-foreground leading-relaxed">
                India's capital markets are inefficient. Most volatility is irrational. This is the perfect hunting ground for institutional-grade AI infrastructure. IndiQuant will become the standard for quant trading in Indian markets.
              </p>
            </div>
          </div>

          <div ref={rightRef} className="space-y-4">
            <div className="glass-panel p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">⊡</span>
                  <h4 className="font-semibold text-foreground">Real-Time Decision Making</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Millisecond-level responsiveness to market events with AI-optimized execution strategies.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">⊡</span>
                  <h4 className="font-semibold text-foreground">Distributed Intelligence</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Globally distributed AI systems working in concert across markets and asset classes.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">⊡</span>
                  <h4 className="font-semibold text-foreground">Continuous Learning</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Self-improving systems that adapt to market regime changes and evolving opportunities.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">⊡</span>
                  <h4 className="font-semibold text-foreground">Institutional Grade</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Built for multi-billion dollar capital deployment with risk management at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
