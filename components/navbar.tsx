'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Mission', href: '#mission' },
    { name: 'Vision', href: '#vision' },
    { name: 'Infrastructure', href: '#infrastructure' },
    { name: 'Systems', href: '#systems' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Network', href: '#network' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 border-b border-[#202020] backdrop-blur-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-[#f1f1ef]">
          Raif Mondal
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="interactive-soft text-xs uppercase tracking-[0.14em] text-[#8f8f8b] hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        <a
          href="https://calendar.app.google/pG5Qv3GQFFZvej3h7"
          target="_blank"
          rel="noopener noreferrer"
          className="interactive-soft text-xs uppercase tracking-[0.14em] text-foreground hover:opacity-70 transition-opacity"
        >
          Book Meeting
        </a>
      </div>
    </nav>
  );
}
