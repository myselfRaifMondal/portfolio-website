'use client';

import { motion } from 'framer-motion';
import { DataStreamBackground } from '@/components/section-backgrounds';

const layers = [
  {
    name: 'Data Acquisition',
    details: 'Tick, depth, and event streams normalized into versioned research datasets.',
  },
  {
    name: 'Feature & Signal Fabric',
    details: 'Reusable transformations, diagnostics, and hypothesis pipelines across strategies.',
  },
  {
    name: 'Model Research Runtime',
    details: 'Controlled training, evaluation, and stress testing with reproducible experiment state.',
  },
  {
    name: 'Execution & Risk Engine',
    details: 'Latency-aware routing, allocation policy, and real-time risk interruption controls.',
  },
];

export function QuantitativeInfrastructure() {
  return (
    <section id="infrastructure" className="section-shell relative overflow-hidden">
      <DataStreamBackground className="pointer-events-none absolute inset-0 z-0 opacity-[0.72]" />
      <div className="content-shell relative z-10">
        <div className="space-y-8">
          <p className="eyebrow">Quantitative Infrastructure</p>
          <h2 className="section-title max-w-4xl">
            A modular stack I am engineering for research velocity and production reliability.
          </h2>
          <p className="section-lead">
            I design infrastructure as composable layers so research hypotheses can graduate into execution systems without architectural rewrites.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="institution-card grid gap-4 md:grid-cols-[220px_1fr] md:items-center"
            >
              <p className="text-sm font-medium tracking-tight text-foreground">{layer.name}</p>
              <p className="text-sm leading-relaxed text-[#a8a8a3]">{layer.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
