'use client';

import { useEffect, useRef } from 'react';
import styles from './issue.module.css';

/**
 * A brass ring that trails the pointer and opens up over anything clickable.
 * Mouse/trackpad only; the native cursor stays visible underneath.
 */
export function BrassCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.on = 'true';
      const target = e.target as Element | null;
      el.dataset.hover = String(!!target?.closest('a, button, [role="button"]'));
    };
    const onLeave = () => (el.dataset.on = 'false');
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className={styles.cursor} aria-hidden="true" />;
}
