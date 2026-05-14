import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const scrollReveal = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
      },
      ease: 'power2.out',
    }
  );
};

export const staggerReveal = (elements: HTMLElement[]) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements[0]?.parentElement || elements[0],
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
      },
      ease: 'power2.out',
    }
  );
};

export const parallaxScroll = (element: HTMLElement | null, speed = 0.5) => {
  if (!element) return;
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
    ease: 'none',
  });
};

export const floatingAnimation = (element: HTMLElement | null, duration = 4) => {
  if (!element) return;
  gsap.to(element, {
    y: -20,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const countUp = (element: HTMLElement | null, target: number, duration = 2) => {
  if (!element) return;
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toLocaleString();
    },
  });
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
