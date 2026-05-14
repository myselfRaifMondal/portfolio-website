'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IntelligenceDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement[]>([]);
  const countupRef = useRef<HTMLSpanElement[]>([]);

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

      metricsRef.current.forEach((metric, i) => {
        gsap.fromTo(
          metric,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: metric,
              start: 'top 85%',
              end: 'top 55%',
              scrub: false,
            },
            ease: 'power2.out',
            delay: i * 0.08,
          }
        );
      });

      // Countup animations
      const metrics = [
        { ref: countupRef.current[0], target: 50, suffix: '+' },
        { ref: countupRef.current[1], target: 2.5, suffix: 'B', isDecimal: true },
        { ref: countupRef.current[2], target: 99.7, suffix: '%', isDecimal: true },
        { ref: countupRef.current[3], target: 150, suffix: '+' },
      ];

      metrics.forEach(({ ref, target, suffix, isDecimal }) => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2.5,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            end: 'top 30%',
            scrub: false,
          },
          ease: 'power2.out',
          onUpdate: () => {
            if (ref) {
              const val = isDecimal ? obj.value.toFixed(1) : Math.floor(obj.value);
              ref.textContent = `${val}${suffix}`;
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const kpis = [
    {
      metric: '42',
      suffix: '+',
      label: 'Alpha Models',
      description: 'Live production ML systems at IndiQuant'
    },
    {
      metric: '3.8',
      suffix: 'B',
      label: 'Daily Data Processed',
      description: 'Market microstructure and execution data'
    },
    {
      metric: '99.8',
      suffix: '%',
      label: 'Infrastructure Uptime',
      description: 'IndiQuant reliability guarantee'
    },
    {
      metric: '7',
      suffix: 'Y',
      label: 'Operating Horizon',
      description: 'Years of strategic thinking crystallized'
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
      <div className="absolute inset-0 data-grid pointer-events-none opacity-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            <span className="text-foreground">Founder&apos;s</span>
            <br />
            <span className="gradient-text">Command Center</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-6">
            IndiQuant operating metrics. Real-time visibility into institutional AI infrastructure I&apos;m building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) metricsRef.current[i] = el;
              }}
              className="glass-panel p-8 space-y-4 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={(el) => {
                      if (el) countupRef.current[i] = el;
                    }}
                    className="text-4xl md:text-5xl font-bold gradient-text"
                  >
                    {kpi.metric}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{kpi.label}</h3>
              </div>

              <p className="text-xs text-muted-foreground">{kpi.description}</p>

              <div className="pt-4 border-t border-white/5">
                <div className="w-full h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:animate-pulse" />
                </div>
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2 text-xs text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom visualization */}
        <div className="mt-20 glass-panel p-12 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">IndiQuant Core Capabilities</h3>
            <p className="text-muted-foreground">Institutional-grade systems operating 24/5 across Indian capital markets</p>
          </div>

          <div className="space-y-4">
            {['Signal Generation', 'Risk Monitoring', 'Execution Intelligence', 'Regime Adaptation'].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-muted-foreground">{item}</span>
                <div className="flex-1 h-px bg-cyan-500/20" />
                <span className="text-xs text-cyan-400/60">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
