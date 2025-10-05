import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { generateContent } from '../lib/groq';
import type { BackroomFile } from '../types/database';
import Header from '../components/Header';

interface FilePageProps {
  fileCode: string;
}

export default function FilePage({ fileCode }: FilePageProps) {
  const [file, setFile] = useState<BackroomFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const tempData = (window as any).tempFileData;
    if (tempData && tempData.file_code === fileCode) {
      setFile({
        id: fileCode,
        file_code: tempData.file_code,
        title: tempData.title,
        content: tempData.content,
        generation_prompt: null,
        is_generated: true,
        order_index: 0,
        created_at: new Date().toISOString(),
      });
      setLoading(false);
    } else {
      loadFile();
    }
  }, [fileCode]);

  async function loadFile() {
    try {
      const { data, error } = await supabase
        .from('backroom_files')
        .select('*')
        .eq('file_code', fileCode)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        if (!data.content && data.generation_prompt) {
          await generateAndSaveContent(data);
        } else {
          setFile(data);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error loading file:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function generateAndSaveContent(fileData: BackroomFile) {
    try {
      setGenerating(true);
      const content = await generateContent(fileData.generation_prompt || '');

      const { data: updatedFile, error: updateError } = await supabase
        .from('backroom_files')
        .update({ content })
        .eq('id', fileData.id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (updatedFile) {
        setFile(updatedFile);
      }
    } catch (err) {
      console.error('Error generating content:', err);
      setFile(fileData);
    } finally {
      setGenerating(false);
    }
  }

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[var(--color-gold)] font-mono text-xl font-bold animate-pulse">
          {generating ? 'GENERATING CONTENT...' : 'ACCESSING FILE...'}
        </div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[var(--color-gold-dimmer)] font-mono text-xl font-bold">FILE NOT FOUND</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black">
      <Header />

      <main className="px-8 lg:px-12 pt-32 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16"
          >
            <div className={`text-xs font-mono mb-6 tracking-widest font-bold ${
              file.is_generated ? 'text-white' : 'text-[var(--color-gold-dimmer)]'
            }`}>
              {file.is_generated ? 'AI GENERATED DOCUMENT' : 'CLASSIFIED DOCUMENT'}
            </div>
            <h1 className={`text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] ${
              file.is_generated ? 'text-white' : 'text-[var(--color-gold)]'
            }`}>
              {file.title}
            </h1>
            <div className="border-t border-[var(--color-gold-border)] pt-4 flex gap-8 text-[var(--color-gold-dimmer)] text-xs font-mono">
              <span>ID: {file.file_code.slice(0, 12)}...</span>
              <span>RECOVERED: {new Date(file.created_at).toLocaleDateString()}</span>
              <span className="text-red-400">STATUS: CORRUPTED</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-20"
          >
            <div className="text-[var(--color-gold-dim)] leading-[1.8] text-lg whitespace-pre-wrap">
              {file.content}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="border-t border-[var(--color-gold-border)] pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-[var(--color-gold)] text-sm tracking-widest font-bold uppercase border border-[var(--color-gold-border)] hover:border-[var(--color-gold)] px-8 py-4 transition-colors"
            >
              ← RETURN TO ARCHIVE
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
