'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NetworkBackground } from '@/components/section-backgrounds';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
        contactRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="network" ref={containerRef} className="section-shell relative overflow-hidden">
      <NetworkBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.66]" />

      <div className="content-shell relative z-10">
        <div className="space-y-12">
          <p className="eyebrow">Contact / Network</p>
          <h2
            ref={titleRef}
            className="section-title max-w-4xl"
          >
            Connect with me on research, capital, and strategic opportunities around IndiQuant.
          </h2>

          <div
            ref={contactRef}
            className="space-y-8 max-w-3xl"
          >
            <p className="section-lead">
              I welcome serious dialogue with institutional partners, domain researchers, and operators focused on the next generation of quantitative market intelligence.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="institution-card interactive-soft space-y-4">
                <p className="text-sm uppercase tracking-[0.14em] text-[#8b8b88]">Email</p>
                <a
                  href="mailto:raifmondal@indiquantresearch.in"
                  className="quiet-link text-base break-all"
                >
                  raifmondal@indiquantresearch.in
                </a>
                <p className="text-sm leading-relaxed text-[#9f9f9a]">
                  For research conversations, partnerships, and serious inbound opportunities.
                </p>
              </div>

              <div className="institution-card interactive-soft space-y-4">
                <p className="text-sm uppercase tracking-[0.14em] text-[#8b8b88]">Meeting</p>
                <a
                  href="https://calendar.app.google/pG5Qv3GQFFZvej3h7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-soft inline-flex w-fit items-center justify-center rounded-sm border border-[#2f2f2f] bg-[#f2f2f0] px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  Book a Meeting
                </a>
                <p className="text-sm leading-relaxed text-[#9f9f9a]">
                  Schedule time directly — no back-and-forth.
                </p>
              </div>
            </div>

            <div className="institution-card interactive-soft">
              <p className="text-sm uppercase tracking-[0.14em] text-[#8b8b88] mb-4">Online</p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="https://linkedin.com/in/raifmondal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link text-sm"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/myselfRaifMondal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link text-sm"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
