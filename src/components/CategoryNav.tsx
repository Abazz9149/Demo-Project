'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/data';

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto hide-scrollbar pb-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            id={`category-${cat.id.toLowerCase()}`}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex flex-col items-center gap-1.5 flex-shrink-0 group relative px-3 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-brand-600 hover:bg-brand-50'
            }`}
          >
            <motion.span
              className="text-xl"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {cat.emoji}
            </motion.span>
            <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${
              isActive ? 'text-white' : 'text-brand-700'
            }`}>
              {cat.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-brand-600 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
