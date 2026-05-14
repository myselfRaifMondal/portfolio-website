'use client';

import { motion } from 'framer-motion';

type BackgroundProps = {
  className?: string;
};

const radarSpokes = [
  { x2: '820', y2: '260' },
  { x2: '710', y2: '450.526' },
  { x2: '490', y2: '450.526' },
  { x2: '380', y2: '260' },
  { x2: '490', y2: '69.474' },
  { x2: '710', y2: '69.474' },
];

export function OrbitBackground({ className }: BackgroundProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.ellipse
          cx="600"
          cy="260"
          rx="440"
          ry="170"
          stroke="#6f6f6b"
          strokeWidth="1"
          strokeDasharray="8 10"
          opacity="0.45"
          animate={{ strokeDashoffset: [0, -180] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        />
        <motion.ellipse
          cx="600"
          cy="260"
          rx="340"
          ry="130"
          stroke="#8e8e89"
          strokeWidth="1"
          strokeDasharray="10 12"
          opacity="0.38"
          animate={{ strokeDashoffset: [0, 200] }}
          transition={{ duration: 19, ease: 'linear', repeat: Infinity }}
        />
        <motion.ellipse
          cx="600"
          cy="260"
          rx="260"
          ry="95"
          stroke="#a8a8a3"
          strokeWidth="1"
          strokeDasharray="7 10"
          opacity="0.3"
          animate={{ strokeDashoffset: [0, -150] }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
        />
        <motion.circle
          cx="1038"
          cy="260"
          r="3"
          fill="#d6d6d2"
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

export function DataStreamBackground({ className }: BackgroundProps) {
  const lanes = [-320, -220, -120, -20, 80, 180, 280, 380];

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="1200" height="520" fill="url(#infra-fade)" opacity="0.65" />

        {lanes.map((offset, index) => (
          <g key={offset}>
            <line
              x1="-220"
              y1={offset + 520}
              x2="1320"
              y2={offset}
              stroke="#2d2d2d"
              strokeWidth="1"
              opacity="0.62"
            />
            <motion.line
              x1="-220"
              y1={offset + 520}
              x2="1320"
              y2={offset}
              stroke="#bcbcb7"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="130 1540"
              initial={{ strokeDashoffset: 0, opacity: 0.28 }}
              animate={{ strokeDashoffset: [-1670], opacity: [0.24, 0.72, 0.24] }}
              transition={{ duration: 9.4 + index * 0.55, repeat: Infinity, ease: 'linear', delay: index * 0.22 }}
            />
          </g>
        ))}

        <defs>
          <linearGradient id="infra-fade" x1="0" y1="0" x2="1200" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#141414" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1f1f1f" stopOpacity="1" />
            <stop offset="1" stopColor="#141414" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function RadarBackground({ className }: BackgroundProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="600" cy="260" r="72" stroke="#2d2d2d" strokeWidth="1" opacity="0.85" />
        <circle cx="600" cy="260" r="132" stroke="#2d2d2d" strokeWidth="1" opacity="0.8" />
        <circle cx="600" cy="260" r="196" stroke="#2d2d2d" strokeWidth="1" opacity="0.75" />

        {radarSpokes.map((spoke, index) => (
          <line
            key={index}
            x1="600"
            y1="260"
            x2={spoke.x2}
            y2={spoke.y2}
            stroke="#252525"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}

        {[0, 1, 2].map((ring) => (
          <motion.circle
            key={ring}
            cx="600"
            cy="260"
            r={86 + ring * 54}
            stroke="#acaca7"
            strokeWidth="1.2"
            strokeDasharray="120 600"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0, opacity: 0.4 }}
            animate={{ strokeDashoffset: [-720], opacity: [0.28, 0.7, 0.28] }}
            transition={{ duration: 8.8 + ring * 1.2, ease: 'linear', repeat: Infinity, delay: ring * 0.9 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function DotFieldBackground({ className }: BackgroundProps) {
  const dots = Array.from({ length: 84 }).map((_, i) => {
    const col = i % 14;
    const row = Math.floor(i / 14);
    return {
      key: i,
      x: 90 + col * 78,
      y: 84 + row * 66,
      delay: (col + row) * 0.07,
    };
  });

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {dots.map((dot) => (
          <motion.circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r="1.5"
            fill="#a6a6a1"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: [0.18, 0.62, 0.18] }}
            transition={{ duration: 3.1, ease: 'easeInOut', repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </svg>
    </div>
  );
}

export function ScanLineBackground({ className }: BackgroundProps) {
  const cells = Array.from({ length: 40 }).map((_, index) => {
    const col = index % 8;
    const row = Math.floor(index / 8);
    return {
      key: index,
      x: 180 + col * 112,
      y: 82 + row * 74,
      delay: row * 0.25 + col * 0.08,
    };
  });

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }).map((_, col) => (
          <line
            key={`v-${col}`}
            x1={170 + col * 112}
            y1="70"
            x2={170 + col * 112}
            y2="450"
            stroke="#232323"
            strokeWidth="1"
            opacity="0.7"
          />
        ))}
        {Array.from({ length: 6 }).map((_, row) => (
          <line
            key={`h-${row}`}
            x1="170"
            y1={70 + row * 74}
            x2="1060"
            y2={70 + row * 74}
            stroke="#232323"
            strokeWidth="1"
            opacity="0.7"
          />
        ))}

        {cells.map((cell) => (
          <motion.rect
            key={cell.key}
            x={cell.x}
            y={cell.y}
            width="92"
            height="54"
            rx="2"
            fill="#b8b8b3"
            initial={{ opacity: 0.06 }}
            animate={{ opacity: [0.06, 0.32, 0.08, 0.48, 0.06] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: cell.delay }}
          />
        ))}
      </svg>
    </div>
  );
}

export function CascadeBackground({ className }: BackgroundProps) {
  const rails = [
    { y: 150, speed: 7.2, delay: 0.1 },
    { y: 260, speed: 8.1, delay: 1 },
    { y: 370, speed: 7.6, delay: 0.5 },
  ];

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {rails.map((rail) => (
          <g key={rail.y}>
            <line x1="120" y1={rail.y} x2="1080" y2={rail.y} stroke="#2e2e2e" strokeWidth="1" opacity="0.9" />
            <line x1="120" y1={rail.y - 24} x2="120" y2={rail.y + 24} stroke="#3a3a3a" strokeWidth="1" opacity="0.65" />
            <line x1="1080" y1={rail.y - 24} x2="1080" y2={rail.y + 24} stroke="#3a3a3a" strokeWidth="1" opacity="0.65" />

            <motion.circle
              cx="120"
              cy={rail.y}
              r="4"
              fill="#c5c5c0"
              initial={{ opacity: 0.35 }}
              animate={{ cx: [120, 1080], opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: rail.speed, repeat: Infinity, ease: 'linear', delay: rail.delay }}
            />

            <motion.circle
              cx="120"
              cy={rail.y}
              r="2.6"
              fill="#d8d8d2"
              initial={{ opacity: 0.25 }}
              animate={{ cx: [120, 1080], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: rail.speed + 2.4, repeat: Infinity, ease: 'linear', delay: rail.delay + 1.2 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BreathingGlowBackground({ className }: BackgroundProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="founder-glow-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(340 260) rotate(90) scale(220 300)">
            <stop stopColor="#d2d2ce" stopOpacity="0.22" />
            <stop offset="1" stopColor="#d2d2ce" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="founder-glow-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(880 260) rotate(90) scale(220 300)">
            <stop stopColor="#b8b8b4" stopOpacity="0.2" />
            <stop offset="1" stopColor="#b8b8b4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.ellipse
          cx="340"
          cy="260"
          rx="250"
          ry="170"
          fill="url(#founder-glow-1)"
          animate={{ opacity: [0.4, 0.8, 0.4], rx: [240, 280, 240], ry: [160, 190, 160] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        />

        <motion.ellipse
          cx="880"
          cy="260"
          rx="240"
          ry="160"
          fill="url(#founder-glow-2)"
          animate={{ opacity: [0.35, 0.75, 0.35], rx: [230, 270, 230], ry: [150, 182, 150] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
        />
      </svg>
    </div>
  );
}

export function NetworkBackground({ className }: BackgroundProps) {
  const nodes = [
    { x: 180, y: 130 },
    { x: 360, y: 220 },
    { x: 520, y: 120 },
    { x: 690, y: 240 },
    { x: 840, y: 150 },
    { x: 980, y: 260 },
    { x: 300, y: 360 },
    { x: 560, y: 360 },
    { x: 810, y: 350 },
  ];

  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 6],
    [3, 7],
    [4, 8],
    [6, 7],
    [7, 8],
  ];

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {links.map(([start, end], index) => (
          <motion.line
            key={`${start}-${end}`}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="#8c8c87"
            strokeWidth="1"
            initial={{ opacity: 0.14 }}
            animate={{ opacity: [0.14, 0.45, 0.14] }}
            transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
          />
        ))}

        {nodes.map((node, index) => (
          <motion.circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="#d2d2cd"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.95, 0.4], r: [2.2, 3.6, 2.2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}