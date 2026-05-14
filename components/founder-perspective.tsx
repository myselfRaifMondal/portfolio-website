'use client';

import { BreathingGlowBackground } from '@/components/section-backgrounds';

export function FounderPerspective() {
  return (
    <section id="perspective" className="section-shell relative overflow-hidden">
      <BreathingGlowBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.44]" />
      <div className="content-shell relative z-10">
        <div className="space-y-8">
          <p className="eyebrow">Founder Perspective</p>
          <h2 className="section-title max-w-4xl">
            I hold myself to research integrity, deployment rigor, and long-term system quality — no shortcuts.
          </h2>
          <p className="section-lead">
            Institutional quality is a design constraint from day one for me. The goal is not to ship fast. The goal is to build systems that hold up under stress, make sense under scrutiny, and stay useful as markets evolve.
          </p>
        </div>

        <div className="mt-10 institution-card">
          <p className="text-sm leading-relaxed text-[#bcbcb7]">
            IndiQuant runs on disciplined iteration: hypothesis, test design, controlled deployment, post-trade analysis, refinement. That loop is how I pace myself, and it is how I hold my own standards.
          </p>
        </div>
      </div>
    </section>
  );
}
