import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BackroomFile } from '../types/database';

interface SearchResult {
  file_code: string;
  title: string;
  content: string;
}

export default function ArchiveList() {
  const [files, setFiles] = useState<BackroomFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [glowSearch, setGlowSearch] = useState(false);

  useEffect(() => {
    loadFiles();

    const handleGlow = () => {
      setGlowSearch(true);
      setTimeout(() => setGlowSearch(false), 800);
    };

    window.addEventListener('triggerSearchGlow', handleGlow);

    return () => window.removeEventListener('triggerSearchGlow', handleGlow);
  }, []);

  async function loadFiles() {
    try {
      const { data, error } = await supabase
        .from('backroom_files')
        .select('*')
        .eq('is_generated', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim() || searching) return;

    setSearching(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-files`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchQuery.trim() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.files || []);
        setSearchQuery('');
      } else {
        const errorData = await response.text();
        setError(`Error: ${response.status} - ${errorData}`);
        console.error('Search failed:', response.status, errorData);
      }
    } catch (error) {
      setError(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  }

  function openFile(fileCode: string) {
    window.history.pushState({}, '', `/archive/${fileCode}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  function openSearchResult(result: SearchResult) {
    const modalContent = {
      file_code: result.file_code,
      title: result.title,
      content: result.content,
    };

    (window as any).tempFileData = modalContent;
    window.history.pushState({}, '', `/archive/${result.file_code}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  function clearSearch() {
    setSearchResults([]);
    setError('');
  }

  if (loading) {
    return (
      <section className="px-8 lg:px-12 py-20">
        <div className="text-[var(--color-gold-dimmer)] text-center text-sm">Loading archive...</div>
      </section>
    );
  }

  return (
    <section id="archives" className="px-8 lg:px-12 py-20 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl lg:text-7xl font-black text-[var(--color-gold)] mb-8 tracking-tighter"
        >
          ARCHIVE FILES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-[var(--color-gold-dim)] leading-[1.8] text-lg max-w-3xl mb-12"
        >
          Recovered documents from traders who have entered the Binance Backrooms. Each file contains verified encounters, observations, and warnings from those who remain trapped within the golden walls.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-6"
        >
          <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH TO GENERATE NEW FILES..."
              className={`w-full bg-black border-2 border-[var(--color-gold-border)] text-[var(--color-gold)] px-6 py-4 pr-14 text-lg focus:outline-none focus:border-[var(--color-gold-dim)] transition-colors placeholder:text-[var(--color-gold-dimmest)] ${glowSearch ? 'animate-glow-once' : ''}`}
              disabled={searching}
            />
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-colors disabled:opacity-30"
            >
              <Search size={24} />
            </button>
            {error && (
              <div className="absolute -bottom-8 left-0 text-red-500 text-sm font-mono">
                {error}
              </div>
            )}
          </form>
          {searching && (
            <div className="text-[var(--color-gold-dim)] text-lg font-mono animate-pulse whitespace-nowrap">
              SCANNING CORRUPTED ARCHIVES...
            </div>
          )}
        </motion.div>
      </div>

      {searchResults.length > 0 && (
        <div className="max-w-[1200px] mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-white tracking-tight">
              SEARCH RESULTS
            </h3>
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all font-mono text-sm font-bold"
            >
              <X size={16} />
              CLEAR
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {searchResults.map((result) => (
              <motion.button
                key={result.file_code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openSearchResult(result)}
                className="relative border-2 border-white/60 bg-white/5 p-8 text-left hover:border-white transition-all duration-300 group overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-white text-xs font-mono mb-4 tracking-widest font-bold">
                    AI GENERATED
                  </div>
                  <div className="text-white text-xl font-bold tracking-tight uppercase">
                    {result.title}
                  </div>
                  <div className="mt-8 text-white text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    CLICK TO ACCESS →
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <motion.button
            key={file.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openFile(file.file_code)}
            className="relative border border-[var(--color-gold-border)] p-8 text-left hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-[var(--color-gold-dimmer)] text-xs font-mono mb-4 tracking-widest font-bold">
                CLASSIFIED
              </div>
              <div className="text-[var(--color-gold)] text-xl font-bold tracking-tight uppercase">
                {file.title}
              </div>
              <div className="mt-8 text-[var(--color-gold)] text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                CLICK TO ACCESS →
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
