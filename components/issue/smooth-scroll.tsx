'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Eased, inertial scrolling for wheel and trackpad. Touch keeps the phone's
 * native scrolling, and visitors who ask for reduced motion get plain scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      autoRaf: true,
      anchors: { offset: -60 },
      // let dialogs and the booking calendar scroll on their own
      prevent: (node) => !!node.closest('[role="dialog"]'),
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
