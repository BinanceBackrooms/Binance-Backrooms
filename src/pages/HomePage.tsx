import Header from '../components/Header';
import Introduction from '../components/Introduction';
import InfoSections from '../components/InfoSections';
import ArchiveList from '../components/ArchiveList';

export default function HomePage() {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-black">
      <Header />
      <main>
        <Introduction />
        <InfoSections />
        <ArchiveList />
      </main>
      <footer className="border-t-2 border-[var(--color-gold-border)] mt-32 bg-gradient-to-b from-transparent to-[var(--color-gold-dimmest)] py-20">
        <div className="px-8 lg:px-12">
          <div className="text-[var(--color-gold)] text-6xl lg:text-8xl font-black text-center tracking-tighter animate-pulse-slow">
            THE MARKET<br />NEVER CLOSES<br />HERE
          </div>
        </div>
      </footer>
    </div>
  );
}
