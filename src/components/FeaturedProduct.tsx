'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { featuredProduct } from '@/lib/data';
import { fadeUpVariants, staggerContainerVariants, viewportConfig } from '@/lib/animations';
import type { Product } from '@/lib/types';

interface FeaturedProductProps {
  onAddToCart: (product: Product) => void;
}

export default function FeaturedProductSection({ onAddToCart }: FeaturedProductProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const mockProduct: Product = {
    id: 'featured-1',
    name: featuredProduct.name,
    description: featuredProduct.description,
    originalPrice: featuredProduct.originalPrice,
    discountedPrice: featuredProduct.discountedPrice,
    discount: 30,
    rating: 4.9,
    reviewCount: 1038,
    image: featuredProduct.image,
    tag: 'Best Seller',
    category: 'Ghee',
    weight: featuredProduct.weight,
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cream-50 overflow-hidden">
      <div className="section-pad max-w-screen-2xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
            Editor's Pick
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900">
            Our Flagship Product
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow */}
              <div className="absolute inset-10 rounded-full bg-earth-200/60 blur-3xl" />

              <motion.div
                style={{ y: imgY, rotate: imgRotate }}
                className="relative z-10 w-full h-full rounded-[48px] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>

              {/* Floating info badge */}
              <motion.div
                className="absolute -bottom-5 left-8 right-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  🐄
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-800">100% A2 Milk</div>
                  <div className="text-[11px] text-brand-400">Certified Gir Cow · Bilona Method</div>
                </div>
                <div className="ml-auto bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  Lab Verified
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2 bg-earth-100 text-earth-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                ⭐ Best Seller · 1,038 Reviews
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-2 leading-tight">
                {featuredProduct.name}
              </h3>
              <p className="text-brand-500/80 text-sm font-medium italic mb-4">{featuredProduct.subtitle}</p>
              <p className="text-brand-600/70 leading-relaxed">
                {featuredProduct.description}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.ul variants={staggerContainerVariants} className="space-y-2.5">
              {featuredProduct.benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={fadeUpVariants}
                  className="flex items-center gap-3 text-sm text-brand-700"
                >
                  <CheckCircle2 size={16} className="text-brand-500 flex-shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>

            {/* Ingredients Tags */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
              {featuredProduct.ingredients.map((ing) => (
                <span key={ing} className="px-3 py-1.5 bg-brand-50 text-brand-600 text-xs font-medium rounded-full border border-brand-100">
                  {ing}
                </span>
              ))}
            </motion.div>

            {/* Price & CTA */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <div>
                <div className="text-3xl font-display font-bold text-brand-800">
                  ₹{featuredProduct.discountedPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-brand-400 line-through">
                  ₹{featuredProduct.originalPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <motion.button
                id="featured-add-to-cart"
                onClick={() => onAddToCart(mockProduct)}
                className="btn-earth text-base px-8 py-3.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Add to Cart <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
