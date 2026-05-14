'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground } from '@/components/section-backgrounds';

gsap.registerPlugin(ScrollTrigger);

export function Research() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 55%',
              scrub: false,
            },
            delay: i * 0.15,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Signal Formation Engine',
      description: 'Structured research programs exploring cross-horizon alpha motifs, regime behavior, and structural inefficiencies.'
    },
    {
      title: 'Execution Intelligence Stack',
      description: 'Execution policy experiments balancing spread capture, impact minimization, and latency-aware routing logic.'
    },
    {
      title: 'Risk-Adaptive Control Layer',
      description: 'Dynamic controls for drawdown containment, exposure shaping, and strategy interruption under adverse regimes.'
    }
  ];

  return (
    <section id="systems" className="section-shell relative overflow-hidden">
      <RadarBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.8]" />
      <div className="content-shell relative z-10">
        <div className="space-y-16">
          <p className="eyebrow">Active Research Systems</p>
          <h2
            ref={titleRef}
            className="section-title max-w-4xl"
          >
            Live programs translating research hypotheses into production-adjacent capabilities.
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
                className="institution-card interactive-soft"
              >
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a8a8a3]">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
