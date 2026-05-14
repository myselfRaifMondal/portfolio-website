'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { MarketMicrostructureMap } from '@/components/market-microstructure-map';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      )
      .fromTo(
        blockRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        0.36
      );
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden pb-24 pt-36 md:pb-36 md:pt-44">
      <MarketMicrostructureMap className="pointer-events-none absolute inset-x-0 top-20 z-0 h-[340px] opacity-[0.92] md:h-[420px]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/25 to-black" />
      <div className="content-shell">
        <div className="relative z-10 space-y-14">
          <div className="space-y-8">
            <p className="eyebrow">Founder & CEO</p>
            <h1
              ref={titleRef}
              className="max-w-5xl text-5xl font-semibold tracking-[-0.03em] text-foreground md:text-7xl lg:text-8xl"
            >
              Raif Mondal
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="section-lead max-w-3xl"
          >
            I build autonomous quantitative intelligence systems for institutional capital markets through IndiQuant, with a focus on deep research infrastructure, risk-aware execution, and long-horizon system design.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:raifmondal@indiquantresearch.in"
              className="interactive-soft inline-flex items-center justify-center rounded-sm border border-[#2f2f2f] bg-[#f2f2f0] px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Email Me
            </a>
            <a
              href="https://calendar.app.google/pG5Qv3GQFFZvej3h7"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-soft inline-flex items-center justify-center rounded-sm border border-[#2f2f2f] px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#4a4a4a]"
            >
              Book a Meeting
            </a>
          </div>

          <div ref={blockRef} className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Focus', value: 'Quantitative AI' },
              { label: 'Company', value: 'IndiQuant' },
              { label: 'Lens', value: 'Market Microstructure' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="institution-card interactive-soft"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.38, delay: index * 0.08, ease: 'easeOut' }}
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b8b88]">{item.label}</p>
                <p className="mt-2 text-base font-medium tracking-tight text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
