'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FounderManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: false,
            },
            ease: 'power2.out',
            delay: i * 0.1,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const manifestoPoints = [
    {
      title: 'Serious Founder',
      description: 'This is institutional infrastructure. Not a startup experiment. Every decision is informed by decade-long market thinking and architectural rigor.'
    },
    {
      title: 'Deep Research',
      description: 'Decisions backed by rigorous quantitative analysis. I spend weeks on problems others solve in days because the depth matters more than the speed.'
    },
    {
      title: 'Autonomous Systems',
      description: 'Building AI that operates independently. The future of capital markets intelligence requires systems that learn, adapt, and improve without handholding.'
    },
    {
      title: 'Institutional Grade',
      description: 'Everything is designed for institutional deployment at scale. Reliability, auditability, and long-term sustainability are non-negotiable.'
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
      <div className="absolute inset-0 data-grid pointer-events-none opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-24">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4"
          >
            <span className="text-foreground">How I Think</span>
            <br />
            <span className="gradient-text">About This</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-6">
            My operating principles for building IndiQuant and architecting the future of quantitative AI in capital markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {manifestoPoints.map((point, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="glass-panel p-8 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                <h3 className="text-xl font-semibold text-foreground">{point.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 space-y-6 max-w-4xl">
          <div className="glass-panel p-8">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              I&apos;m operating at the intersection of cutting-edge AI research and capital markets infrastructure. My competitive advantage isn&apos;t moving fast—it&apos;s thinking deeply about systems that will operate for decades. IndiQuant represents a decade of thinking crystallized into infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
