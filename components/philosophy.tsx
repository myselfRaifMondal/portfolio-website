'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotFieldBackground } from '@/components/section-backgrounds';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
          delay: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="engineering" className="section-shell relative overflow-hidden">
      <DotFieldBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.48]" />
      <div className="content-shell relative z-10">
        <div className="space-y-12">
          <p className="eyebrow">Engineering Philosophy</p>
          <h2
            ref={titleRef}
            className="section-title max-w-4xl"
          >
            I engineer financial intelligence like critical infrastructure: constrained, observable, and auditable.
          </h2>

          <div ref={textRef} className="space-y-8 section-lead">
            <p>
              Through IndiQuant, I treat software architecture, model behavior, and risk policy as one continuous system. I avoid fragmented stacks where research and execution drift apart.
            </p>

            <p>
              Speed without traceability is noise. Every capability I build is expected to expose its decision pathways, runtime diagnostics, and failure conditions before it touches production.
            </p>

            <p>
              My standard is long-horizon maintainability. I write systems that stay coherent under market stress, survive operational interruptions, and adapt as strategy evolves — not just systems that work on the day they are deployed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
