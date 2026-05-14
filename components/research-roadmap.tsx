'use client';

import { CascadeBackground } from '@/components/section-backgrounds';

const roadmap = [
  {
    phase: 'Phase I',
    timeline: 'Current',
    text: 'Consolidating research infrastructure and production-grade observability across core signal pipelines.',
  },
  {
    phase: 'Phase II',
    timeline: 'Near-term',
    text: 'Deploying adaptive execution intelligence with expanded multi-asset microstructure diagnostics.',
  },
  {
    phase: 'Phase III',
    timeline: 'Long-term',
    text: 'Advancing autonomous allocation systems with institutional governance and scenario-contingent controls.',
  },
];

export function ResearchRoadmap() {
  return (
    <section id="roadmap" className="section-shell relative overflow-hidden">
      <CascadeBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.64]" />
      <div className="content-shell relative z-10">
        <div className="space-y-8">
          <p className="eyebrow">Research Timeline</p>
          <h2 className="section-title max-w-4xl">
            My roadmap is built around capability maturation, not launch theatrics.
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          {roadmap.map((item) => (
            <article key={item.phase} className="institution-card interactive-soft">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-sm font-medium text-foreground">{item.phase}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-[#8b8b88]">{item.timeline}</p>
              </div>
              <div className="microstructure-line mt-4" />
              <p className="mt-4 text-sm leading-relaxed text-[#a8a8a3]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
