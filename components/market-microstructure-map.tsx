'use client';

import { motion } from 'framer-motion';

type MarketMicrostructureMapProps = {
  className?: string;
};

export function MarketMicrostructureMap({ className }: MarketMicrostructureMapProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1200 420"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="micro-line" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E2E2E" stopOpacity="0" />
            <stop offset="0.28" stopColor="#6F6F6B" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#9A9A95" stopOpacity="0.45" />
            <stop offset="1" stopColor="#2E2E2E" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g opacity="0.52">
          {Array.from({ length: 8 }).map((_, row) => (
            <line
              key={`h-${row}`}
              x1="0"
              y1={40 + row * 46}
              x2="1200"
              y2={40 + row * 46}
              stroke="#2A2A2A"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 24 }).map((_, col) => (
            <line
              key={`v-${col}`}
              x1={40 + col * 48}
              y1="0"
              x2={40 + col * 48}
              y2="420"
              stroke="#202020"
              strokeWidth="1"
            />
          ))}
        </g>

        <motion.path
          d="M10 280 C120 250, 210 310, 320 250 C390 214, 500 215, 580 180 C670 145, 740 198, 840 156 C940 120, 1010 190, 1190 110"
          stroke="url(#micro-line)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0.12, pathOffset: 0.9, opacity: 0.35 }}
          animate={{ pathLength: [0.12, 0.22, 0.12], pathOffset: [0.9, 0.1, 0.9], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M10 335 C120 380, 220 285, 345 312 C430 330, 540 260, 640 298 C760 344, 845 230, 970 265 C1070 292, 1138 220, 1190 244"
          stroke="url(#micro-line)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0.1, pathOffset: 0.75, opacity: 0.25 }}
          animate={{ pathLength: [0.1, 0.2, 0.1], pathOffset: [0.75, 0.2, 0.75], opacity: [0.5, 0.78, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 1.1 }}
        />
      </svg>
    </div>
  );
}
