'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import CategoryNav from './CategoryNav';
import ProductCard from './ProductCard';
import {
  sectionBadgeVariants,
  sectionHeadingVariants,
  sectionDescVariants,
  cardStaggerVariants,
  buttonRevealVariants,
  viewportConfig,
  staggerContainerVariants,
} from '@/lib/animations';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 lg:py-28 bg-cream-50 scroll-mt-24 sm:scroll-mt-28">
      <div className="section-pad max-w-screen-2xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-10"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.span variants={sectionBadgeVariants} className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
            Our Products
          </motion.span>
          <motion.h2 variants={sectionHeadingVariants} className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
            Purity, Bottled &amp; Packed
          </motion.h2>
          <motion.p variants={sectionDescVariants} className="text-brand-600/70 text-lg max-w-xl mx-auto">
            Every product passes 20+ quality checks. Every ingredient is natively sourced. Every batch is small and intentional.
          </motion.p>
        </motion.div>

        {/* Category Nav */}
        <motion.div
          className="flex justify-center mb-10"
          variants={buttonRevealVariants}
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
            variants={cardStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
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
          variants={buttonRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.button
            id="view-all-btn"
            className="btn-outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
