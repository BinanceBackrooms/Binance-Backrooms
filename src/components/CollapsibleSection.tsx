import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[var(--color-gold-border)] max-w-[1200px] mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-10 px-8 lg:px-12 flex items-center justify-between text-left hover:bg-[var(--color-gold-border)] transition-all duration-300 group"
      >
        <span className="text-3xl lg:text-4xl font-bold text-[var(--color-gold)] tracking-tight uppercase group-hover:tracking-wide transition-all duration-300">
          {title}
        </span>
        <span className="text-[var(--color-gold)] text-3xl font-bold group-hover:rotate-90 transition-transform duration-300">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-16 pt-4 max-w-4xl px-8 lg:px-12">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
