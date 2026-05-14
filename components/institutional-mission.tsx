'use client';

import { motion } from 'framer-motion';
import { OrbitBackground } from '@/components/section-backgrounds';

const principles = [
  {
    title: 'Long-Horizon Systems',
    body: 'Architected for compounding performance over market cycles, not short-term signal noise.',
  },
  {
    title: 'Research Before Deployment',
    body: 'Every production capability originates in controlled experimentation and adversarial validation.',
  },
  {
    title: 'Reliability as Strategy',
    body: 'Operational resilience, observability, and risk controls are treated as first-class alpha enablers.',
  },
];

export function InstitutionalMission() {
  return (
    <section id="mission" className="section-shell relative overflow-hidden">
      <OrbitBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.68]" />
      <div className="content-shell relative z-10">
        <div className="space-y-8">
          <p className="eyebrow">Institutional Mission</p>
          <h2 className="section-title max-w-4xl">
            Building IndiQuant means building research infrastructure for autonomous quantitative intelligence.
          </h2>
          <p className="section-lead">
            My mandate is precise: design machine-native systems that can observe, reason, and execute across dynamic capital markets with institutional discipline.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              className="institution-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            >
              <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a8a8a3]">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
