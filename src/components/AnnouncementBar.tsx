'use client';

import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-800 text-white text-xs sm:text-sm py-2 sm:py-2.5 px-4 overflow-hidden border-b border-brand-700/40">
      <motion.div
        className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10 whitespace-nowrap"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cream-300 inline-block" />
          <span className="font-medium text-cream-100">Pure A2 Ghee &amp; Cold-Pressed Oils</span>
        </span>
        <span className="hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-earth-400 inline-block" />
          <span className="font-bold text-cream-300">15% OFF</span>
          <span className="text-cream-100">on your first order</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cream-300 inline-block" />
          <span className="text-cream-100">
            Use Code:{' '}
            <span className="font-bold tracking-wider text-cream-200 border border-cream-400/40 px-2 py-0.5 rounded bg-brand-900/40">
              PURE15
            </span>
          </span>
        </span>
      </motion.div>
    </div>
  );
}
