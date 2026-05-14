'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Brain, TrendingUp, Zap, Network, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ResearchSystems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        // Staggered reveal with rotation and scale
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.85, rotationX: 10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: false,
            },
            ease: 'back.out(1.2)',
            delay: i * 0.12,
          }
        );

        // Hover effect - subtle glow intensification
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.4)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0px rgba(0, 217, 255, 0)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const systems = [
    {
      icon: Brain,
      title: 'Alpha Generation Models',
      description: 'Deep learning systems trained on 15+ years of market data. Focus on hidden market structures and regime-dependent signal discovery.',
      tags: ['Research', 'Deep Learning', 'Time Series', 'PyTorch']
    },
    {
      icon: TrendingUp,
      title: 'IndiQuant Trading Infrastructure',
      description: 'Autonomous execution systems with institutional-grade risk management. Real-time optimization across Indian equities, derivatives, and crypto.',
      tags: ['Trading', 'Execution', 'Risk Mgmt', 'Live Systems']
    },
    {
      icon: Network,
      title: 'Market Microstructure AI',
      description: 'Neural networks analyzing order flow, volatility clustering, and market regime shifts at millisecond granularity.',
      tags: ['Graph ML', 'Microstructure', 'Real-Time', 'Analysis']
    },
    {
      icon: Database,
      title: 'Institutional Data Pipeline',
      description: 'Processing 500TB+ of market data monthly. Sub-millisecond latency. Built for institutional research teams and live trading.',
      tags: ['Data Eng', 'Kafka', 'Rust', 'Petabyte Scale']
    },
    {
      icon: Zap,
      title: 'Autonomous Decision Systems',
      description: 'Multi-agent reinforcement learning systems that adapt to market regimes without human intervention. The future of execution.',
      tags: ['RL', 'Agents', 'Autonomous', 'Advanced Research']
    },
    {
      icon: Cpu,
      title: 'High-Performance Infrastructure',
      description: 'Custom GPU clusters for training models in minutes instead of hours. Enterprise-grade reliability designed for institutional operations.',
      tags: ['HPC', 'GPU', 'Cloud Scale', 'Enterprise']
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
      <div className="absolute inset-0 data-grid pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            <span className="text-foreground">Active</span>
            <br />
            <span className="gradient-text">Research Initiatives</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-6">
            What I&apos;m actively building and researching at IndiQuant. Each represents deep institutional thinking applied to capital markets infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, i) => {
            const Icon = system.icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="group glass-panel p-8 space-y-6 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-cyan-500/10 rounded-sm group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{system.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{system.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {system.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs rounded-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs text-cyan-400/60 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Active Research
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
