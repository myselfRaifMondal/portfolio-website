'use client';

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-[#202020]">
      <div className="content-shell">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#8b8b88]">Raif Mondal</p>
            <p className="mt-2 text-sm text-[#b9b9b4]">Founder, IndiQuant</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8b8b88]">
            <a
              href="https://linkedin.com/in/raifmondal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#bfbfba] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/myselfRaifMondal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#bfbfba] transition-colors duration-200"
            >
              GitHub
            </a>
            <span>© 2026 Raif Mondal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
