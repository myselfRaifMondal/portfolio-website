'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Pentatonic in A: soft and consonant, nothing ever resolves into tension.
const DRONE = [110, 164.81, 220];
const NOTES = [440, 493.88, 554.37, 659.25, 739.99, 880];

/**
 * Optional ambient music, generated with Web Audio (no files to download):
 * a slow breathing drone with a sparse lyre-like pluck. Off until the visitor
 * turns it on; browsers only allow audio after a user gesture anyway.
 */
export function useLyre() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pluck = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = NOTES[Math.floor(Math.random() * NOTES.length)];
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + 4.1);
    timerRef.current = setTimeout(pluck, 3500 + Math.random() * 4500);
  }, []);

  const start = useCallback(() => {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return false;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    master.connect(filter).connect(ctx.destination);

    DRONE.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.08 / (i + 1);
      // each voice swells slowly, out of phase with the others
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.02;
      const depth = ctx.createGain();
      depth.gain.value = 0.03 / (i + 1);
      lfo.connect(depth).connect(g.gain);
      osc.connect(g).connect(master);
      osc.start();
      lfo.start();
    });

    master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3);
    ctxRef.current = ctx;
    masterRef.current = master;
    timerRef.current = setTimeout(pluck, 1500);
    return true;
  }, [pluck]);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const ctx = ctxRef.current;
    const master = masterRef.current;
    ctxRef.current = null;
    masterRef.current = null;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    setTimeout(() => ctx.close(), 1400);
  }, []);

  // Side effects stay out of state updaters (StrictMode runs updaters twice).
  const toggle = useCallback(() => {
    if (ctxRef.current) {
      stop();
      setOn(false);
    } else if (start()) {
      setOn(true);
    }
  }, [start, stop]);

  useEffect(() => stop, [stop]);

  return { on, toggle };
}
