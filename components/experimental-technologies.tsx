'use client';

import { motion } from 'framer-motion';
import { ScanLineBackground } from '@/components/section-backgrounds';

const experiments = [
  {
    title: 'Adaptive Regime Mapping',
    note: 'Probabilistic regime boundaries updated from order-flow asymmetry and volatility state transitions.',
  },
  {
    title: 'Agentic Allocation Policies',
    note: 'Policy networks that adapt capital deployment parameters under changing liquidity topologies.',
  },
  {
    title: 'Execution Micro-Simulation',
    note: 'Simulation environments for slippage-aware behavior benchmarking before market exposure.',
  },
  {
    title: 'Model Governance Traces',
    note: 'Experiment lineage and decision traceability for institutional audit and review readiness.',
  },
];

export function ExperimentalTechnologies() {
  return (
    <section id="experimental" className="section-shell relative overflow-hidden">
      <ScanLineBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.86]" />
      <div className="content-shell relative z-10">
        <div className="space-y-8">
          <p className="eyebrow">Experimental Technologies</p>
          <h2 className="section-title max-w-4xl">
            Programs I am running to compound structural edge over time.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {experiments.map((item, index) => (
            <motion.article
              key={item.title}
              className="institution-card interactive-soft"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.42, delay: index * 0.07, ease: 'easeOut' }}
            >
              <p className="text-sm font-medium tracking-tight text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#a8a8a3]">{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
