import { useId, type ReactNode } from 'react';

/*
 * Engraving kit: everything here is drawn the way banknotes and coins are,
 * with thin parallel lines, beaded rims and guilloche bands, so the whole site
 * shares one hand. Geometry is computed, so it is identical on server and client.
 */

const TAU = Math.PI * 2;
const f = (n: number) => n.toFixed(1);

/** A closed curve r(t) = base + amp * sin(lobes * t), as an SVG path. Cached: each band is computed once per process. */
const waveCache = new Map<string, string>();
function wave(cx: number, cy: number, base: number, amp: number, lobes: number) {
  const key = `${cx},${cy},${base},${amp},${lobes}`;
  const hit = waveCache.get(key);
  if (hit) return hit;
  const steps = lobes * 12; // ~12 points per lobe keeps curves smooth and the HTML small
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const r = base + amp * Math.sin(lobes * t);
    d += `${i ? 'L' : 'M'}${f(cx + r * Math.cos(t))} ${f(cy + r * Math.sin(t))}`;
  }
  d += 'Z';
  waveCache.set(key, d);
  return d;
}

/**
 * A woven guilloche band between two radii. Every strand is the same curve with
 * a phase shift, and a phase shift of k/strands of a turn equals rotating the
 * curve by -360k/(strands*lobes) degrees, so the path is drawn once and reused.
 */
export function GuillocheBand({ cx, cy, inner, outer, lobes, strands }: { cx: number; cy: number; inner: number; outer: number; lobes: number; strands: number }) {
  const id = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <g fill="none" stroke="currentColor" strokeWidth="0.35">
      <path id={id} d={wave(cx, cy, (inner + outer) / 2, (outer - inner) / 2, lobes)} />
      {Array.from({ length: strands - 1 }, (_, i) => (
        <use key={i} href={`#${id}`} transform={`rotate(${f((-360 * (i + 1)) / (strands * lobes))} ${cx} ${cy})`} />
      ))}
    </g>
  );
}

/** Ring of small beads, as struck on the rim of an ancient coin: one dotted circle. */
function Beads({ cx, cy, r, count, size }: { cx: number; cy: number; r: number; count: number; size: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={size * 2} strokeLinecap="round" strokeDasharray={`0 ${((TAU * r) / count).toFixed(3)}`} />;
}

/**
 * The large banknote rosette used beside the name. The guilloche bands sit in
 * their own SVG so a wrapper can spin them as one composited layer (spinning a
 * group inside the SVG would repaint every line on every frame and stutter scrolling).
 */
export function Rosette({ className, spinClassName, children }: { className?: string; spinClassName?: string; children?: ReactNode }) {
  return (
    <div className={className} style={{ position: 'relative', aspectRatio: '1' }} aria-hidden="true">
      <div className={spinClassName} style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 400 400" style={{ display: 'block', width: '100%', height: '100%' }}>
          <GuillocheBand cx={200} cy={200} inner={150} outer={192} lobes={24} strands={12} />
          <GuillocheBand cx={200} cy={200} inner={112} outer={146} lobes={16} strands={10} />
          <GuillocheBand cx={200} cy={200} inner={86} outer={108} lobes={32} strands={6} />
          <circle cx="200" cy="200" r="194" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </div>
      <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="200" cy="200" r="82" fill="var(--paper)" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="76" fill="none" stroke="currentColor" strokeWidth="0.35" />
        {children}
      </svg>
    </div>
  );
}

type Emblem = 'thunderbolt' | 'owl' | 'caduceus' | 'cornucopia' | 'wheel';

/** Coin-style medallion: beaded rim, guilloche band, Greek legend, engraved emblem. */
export function Medallion({ legend, emblem, className }: { legend: string; emblem: Emblem; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const hatch = `h${id}`;
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={legend}>
      <defs>
        <pattern id={hatch} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <line x1="0" y1="0" x2="0" y2="2.4" stroke="currentColor" strokeWidth="0.55" />
        </pattern>
      </defs>
      <Beads cx={100} cy={100} r={96} count={72} size={1.1} />
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <GuillocheBand cx={100} cy={100} inner={78} outer={90} lobes={20} strands={6} />
      <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="0.6" />
      {/* legend set letter by letter around the top, centred on twelve o'clock */}
      <g fill="currentColor" fontSize="10.5" textAnchor="middle" style={{ fontFamily: 'var(--greek)' }}>
        {Array.from(legend).map((ch, i, all) => {
          const deg = (i - (all.length - 1) / 2) * 11;
          return (
            <text key={i} x="100" y="40" transform={`rotate(${deg} 100 100)`}>
              {ch}
            </text>
          );
        })}
      </g>
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="0.35" />
      <g transform="translate(57 57) scale(0.86)" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
        <EmblemArt kind={emblem} fill={`url(#${hatch})`} />
      </g>
    </svg>
  );
}

/** Emblems drawn on a 100 x 100 field. Hatch fill plus a firm outline reads as engraving. */
function EmblemArt({ kind, fill }: { kind: Emblem; fill: string }) {
  switch (kind) {
    case 'thunderbolt':
      // the keraunos as struck on Elean staters: a pointed spindle, a bound waist, forked bolts at each end
      return (
        <g>
          <path fill={fill} d="M50 16 C56 32 57 42 57 50 C57 58 56 68 50 84 C44 68 43 58 43 50 C43 42 44 32 50 16 Z" />
          <path fill="var(--paper)" d="M42 45 H58 V55 H42 Z" />
          <path fill="none" strokeWidth="0.7" d="M42 48 H58 M42 52 H58" />
          <path fill="none" d="M50 16 V4 M47 20 L40 13 L44 11 L35 2 M53 20 L60 13 L56 11 L65 2" />
          <path fill="none" d="M50 84 V96 M47 80 L40 87 L44 89 L35 98 M53 80 L60 87 L56 89 L65 98" />
        </g>
      );
    case 'owl':
      return (
        <g>
          <path fill={fill} d="M50 30 C71 30 76 54 71 72 C67 88 33 88 29 72 C24 54 29 30 50 30 Z" />
          <path fill="var(--paper)" d="M31 40 L28 20 L42 30 C46 28 54 28 58 30 L72 20 L69 40 C68 52 32 52 31 40 Z" />
          <circle cx="41" cy="39" r="7.5" fill="var(--paper)" />
          <circle cx="59" cy="39" r="7.5" fill="var(--paper)" />
          <circle cx="41" cy="39" r="2.8" fill="currentColor" />
          <circle cx="59" cy="39" r="2.8" fill="currentColor" />
          <path fill="currentColor" d="M47 45 L53 45 L50 51 Z" />
          <path fill="none" strokeWidth="0.7" d="M36 60 C42 66 42 74 38 80 M64 60 C58 66 58 74 62 80 M44 62 L46 64 L48 62 M52 62 L54 64 L56 62 M44 70 L46 72 L48 70 M52 70 L54 72 L56 70" />
          <path fill="none" d="M40 86 L38 92 M46 86 L46 92 M54 86 L54 92 M60 86 L62 92" />
          <path fill="none" strokeWidth="0.8" d="M12 26 C16 18 22 14 30 14" />
          <path fill={fill} d="M14 22 C10 18 10 14 13 12 C16 15 16 19 14 22 Z M20 17 C17 12 18 8 21 7 C23 10 22 14 20 17 Z" />
        </g>
      );
    case 'caduceus':
      return (
        <g>
          <path fill={fill} d="M48 22 C38 10 22 10 10 18 C22 18 30 22 40 26 C30 26 22 28 14 34 C28 32 40 32 48 28 Z" />
          <path fill={fill} d="M52 22 C62 10 78 10 90 18 C78 18 70 22 60 26 C70 26 78 28 86 34 C72 32 60 32 52 28 Z" />
          <path fill="none" strokeWidth="2.4" d="M50 16 V94" />
          <circle cx="50" cy="13" r="4.5" fill={fill} />
          <path fill="none" strokeWidth="3.4" d="M44 34 C64 42 64 50 50 56 C36 62 36 70 50 76 C62 81 60 88 52 92" />
          <path fill="none" strokeWidth="3.4" d="M56 34 C36 42 36 50 50 56 C64 62 64 70 50 76 C38 81 40 88 48 92" />
          <path fill="none" stroke="var(--paper)" strokeWidth="1.2" d="M44 34 C64 42 64 50 50 56 C36 62 36 70 50 76 C62 81 60 88 52 92" />
          <path fill="none" stroke="var(--paper)" strokeWidth="1.2" d="M56 34 C36 42 36 50 50 56 C64 62 64 70 50 76 C38 81 40 88 48 92" />
          <circle cx="42" cy="33" r="3" fill="currentColor" />
          <circle cx="58" cy="33" r="3" fill="currentColor" />
        </g>
      );
    case 'cornucopia':
      return (
        <g>
          <path fill={fill} d="M86 88 C64 92 36 80 26 58 C22 48 24 40 28 34 C40 36 50 38 56 46 C48 48 44 56 50 64 C58 74 72 82 86 88 Z" />
          <path fill="none" strokeWidth="0.7" d="M34 50 C40 46 46 46 50 48 M40 64 C46 60 52 62 54 66 M50 74 C56 72 62 74 64 78 M62 82 C66 80 72 82 74 84" />
          <ellipse cx="42" cy="38" rx="15" ry="6" transform="rotate(14 42 38)" fill="var(--paper)" />
          <circle cx="32" cy="28" r="6" fill={fill} />
          <circle cx="44" cy="24" r="6.5" fill={fill} />
          <circle cx="54" cy="31" r="5" fill={fill} />
          <circle cx="24" cy="36" r="4.5" fill={fill} />
          <path fill={fill} d="M38 18 C36 10 40 6 46 6 C46 12 42 16 38 18 Z M50 20 C54 14 60 14 64 18 C58 21 54 21 50 20 Z" />
          <path fill="none" d="M18 44 C14 52 16 60 22 62" strokeWidth="0.8" />
          <circle cx="22" cy="64" r="2.2" fill="currentColor" />
          <circle cx="16" cy="58" r="2" fill="currentColor" />
        </g>
      );
    case 'wheel':
      return (
        <g>
          <circle cx="50" cy="50" r="38" fill={fill} />
          <circle cx="50" cy="50" r="30" fill="var(--paper)" />
          {Array.from({ length: 8 }, (_, i) => {
            const t = (i / 8) * TAU;
            return <path key={i} fill="none" strokeWidth="3" d={`M${f(50 + 8 * Math.cos(t))} ${f(50 + 8 * Math.sin(t))} L${f(50 + 30 * Math.cos(t))} ${f(50 + 30 * Math.sin(t))}`} />;
          })}
          <circle cx="50" cy="50" r="9" fill={fill} />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          {Array.from({ length: 16 }, (_, i) => {
            const t = (i / 16) * TAU;
            return <circle key={i} cx={f(50 + 34 * Math.cos(t))} cy={f(50 + 34 * Math.sin(t))} r="1.1" fill="var(--paper)" stroke="none" />;
          })}
        </g>
      );
  }
}

/** Monogram set in the centre of the rosette. */
export function Monogram() {
  return (
    <g fill="currentColor" style={{ fontFamily: 'var(--display), Georgia, serif' }}>
      <text x="200" y="222" textAnchor="middle" fontSize="70" fontStyle="italic" fontWeight="300">
        RM
      </text>
      <text x="200" y="250" textAnchor="middle" fontSize="9" letterSpacing="4">
        MMXXVI
      </text>
    </g>
  );
}

/** Thin double rule with a small lozenge, used between chapters. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 14" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.6" fill="none">
        <path d="M0 6 H104 M0 8 H104 M136 6 H240 M136 8 H240" />
        <path d="M120 1 L127 7 L120 13 L113 7 Z" />
        <path d="M108 7 H113 M127 7 H132" />
      </g>
      <circle cx="120" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}
