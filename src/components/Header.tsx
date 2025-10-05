import { Folder } from 'lucide-react';

export default function Header() {
  const handleGenerateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('triggerSearchGlow'));

    const archivesSection = document.getElementById('archives');
    if (archivesSection) {
      archivesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
      <div className="px-8 lg:px-12 py-8 flex items-center justify-between">
        <div className="text-[var(--color-gold)] font-bold text-lg tracking-tight uppercase">
          BINANCE BACKROOMS
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#archives"
            onClick={handleGenerateClick}
            className="hidden md:flex items-center gap-2 text-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-all duration-300 border border-[var(--color-gold-border)] hover:border-[var(--color-gold)] px-4 py-2 hover:scale-105 group"
          >
            <Folder className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="https://github.com/BinanceBackrooms/Binance-Backrooms"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <img
              src="https://res.cloudinary.com/dlmfjcgaw/image/upload/v1759686482/GitHub_Logo_White_woziof.png"
              alt="GitHub"
              className="h-6"
            />
          </a>
          <a
            href="https://x.com/BinanceBckrooms"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <img
              src="https://res.cloudinary.com/dlmfjcgaw/image/upload/v1759686587/logo-white_jewrnf.png"
              alt="X"
              className="h-[15px]"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
