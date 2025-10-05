import { useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SearchResult {
  file_code: string;
  title: string;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || searching) return;

    setSearching(true);
    setResults([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-files`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: query.trim() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.files || []);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  }

  function openFile(fileCode: string) {
    window.history.pushState({}, '', `/archive/${fileCode}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  return (
    <section className="px-8 lg:px-12 py-20 border-b-2 border-[var(--color-gold-border)]">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="flex items-center gap-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH CLASSIFIED FILES..."
              className="w-full bg-black border-2 border-[var(--color-gold-border)] text-[var(--color-gold)] px-6 py-4 pr-14 text-lg focus:outline-none focus:border-[var(--color-gold-dim)] transition-colors placeholder:text-[var(--color-gold-dimmest)]"
              disabled={searching}
            />
            <button
              type="submit"
              disabled={searching || !query.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-colors disabled:opacity-30"
            >
              <Search size={24} />
            </button>
          </div>
          {searching && (
            <div className="text-[var(--color-gold-dim)] text-lg animate-pulse whitespace-nowrap">
              GENERATING FILES...
            </div>
          )}
        </form>
      </div>

      {results.length > 0 && !searching && (
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
          <div className="text-[var(--color-gold-dimmer)] text-sm font-mono mb-4">
            SEARCH RESULTS: {results.length} FILES GENERATED
          </div>
          {results.map((file) => (
            <button
              key={file.file_code}
              onClick={() => openFile(file.file_code)}
              className="w-full bg-black border-2 border-[var(--color-gold-border)] hover:border-[var(--color-gold-dim)] p-6 text-left transition-all group"
            >
              <div className="text-[var(--color-gold)] font-mono text-sm mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                FILE: {file.file_code}
              </div>
              <div className="text-[var(--color-gold)] text-xl font-semibold group-hover:text-[var(--color-gold-dim)] transition-colors">
                {file.title}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
