'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import CategoryNav from './CategoryNav';
import ProductCard from './ProductCard';
import { fadeUpVariants, staggerContainerVariants, viewportConfig } from '@/lib/animations';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 lg:py-28 bg-cream-50">
      <div className="section-pad max-w-screen-2xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-10"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
            Our Products
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
            Purity, Bottled &amp; Packed
          </h2>
          <p className="text-brand-600/70 text-lg max-w-xl mx-auto">
            Every product passes 20+ quality checks. Every ingredient is natively sourced. Every batch is small and intentional.
          </p>
        </motion.div>

        {/* Category Nav */}
        <motion.div
          className="flex justify-center mb-10"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All button */}
        <motion.div
          className="flex justify-center mt-12"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <button id="view-all-btn" className="btn-outline">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}
