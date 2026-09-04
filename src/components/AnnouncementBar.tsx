'use client';

import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-800 text-white text-xs sm:text-sm py-2 px-4 overflow-hidden">
      <motion.div
        className="flex items-center justify-center gap-6 sm:gap-10 whitespace-nowrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cream-300 inline-block" />
          <span>Pure A2 Ghee &amp; Cold-Pressed Oils</span>
        </span>
        <span className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-earth-400 inline-block" />
          <span className="font-semibold text-cream-300">15% OFF</span>
          <span>on your first order</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cream-300 inline-block" />
          <span>
            Use Code:{' '}
            <span className="font-bold tracking-widest text-cream-300 border border-cream-400/40 px-2 py-0.5 rounded">
              PURE15
            </span>
          </span>
        </span>
      </motion.div>
    </div>
  );
}
