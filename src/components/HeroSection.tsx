'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { heroTextVariants, staggerContainerVariants, fadeUpVariants, scaleInVariants } from '@/lib/animations';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream-50 via-brand-50/40 to-cream-100"
    >
      {/* Subtle organic background texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cream-200/60 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-earth-100/30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Decorative leaf pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <svg className="absolute top-10 left-10 w-64 h-64 text-brand-700" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 10 C60 10 20 50 20 100 C20 150 60 190 100 190 C140 190 180 150 180 100 C180 50 140 10 100 10 Z M100 170 C70 170 40 140 40 100 C40 60 70 30 100 30 C130 30 160 60 160 100 C160 140 130 170 100 170 Z" />
        </svg>
      </div>

      <div className="section-pad max-w-screen-2xl mx-auto w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="relative z-10"
            style={{ y: textY, opacity }}
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUpVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-600/10 text-brand-700 text-xs font-semibold px-4 py-2 rounded-full border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                100% Certified Organic · Direct from Farms
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                variants={heroTextVariants}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 leading-[1.05] tracking-tight"
              >
                Pure Roots.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1
                variants={heroTextVariants}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                <span className="text-gradient">Real Nutrition.</span>
              </motion.h1>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="text-brand-600/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-8"
            >
              We bring back what Indian kitchens were always meant to have — <strong className="font-semibold text-brand-700">traditionally processed, natively sourced</strong> foods that nourish the way nature intended.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4 mb-10">
              <a id="hero-shop-btn" href="#products" className="btn-primary text-base px-8 py-3.5">
                Shop Now <ArrowRight size={16} />
              </a>
              <button
                id="hero-story-btn"
                className="btn-outline text-base px-7 py-3.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 bg-brand-600 rounded-full flex items-center justify-center">
                  <Play size={11} fill="white" className="text-white ml-0.5" />
                </div>
                Our Story
              </button>
            </motion.div>

            {/* Trust Stats */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-6 sm:gap-10">
              {[
                { value: '50K+', label: 'Happy Families' },
                { value: '5000+', label: 'Farming Partners' },
                { value: '20+', label: 'Quality Tests' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-brand-700">{stat.value}</div>
                  <div className="text-xs text-brand-500 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Product Imagery */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ y: imgY }}
            variants={scaleInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            {/* Main product image */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glowing background circle */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-100 to-cream-200 blur-2xl opacity-80" />

              {/* Main image */}
              <motion.div
                className="relative z-10 w-full h-full rounded-[40px] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=85"
                  alt="Premium A2 Desi Cow Ghee — VedaRoots flagship product"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 to-transparent" />
              </motion.div>

              {/* Floating ingredient cards */}
              <motion.div
                className="absolute -top-4 -right-4 sm:-right-8 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 max-w-[140px]"
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-xl mb-1">🐄</div>
                <div className="text-xs font-semibold text-brand-800">A2 Gir Cow</div>
                <div className="text-[10px] text-brand-500">Bilona Churned</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 max-w-[140px]"
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-xl mb-1">⭐</div>
                <div className="text-xs font-semibold text-brand-800">4.9 / 5 Rating</div>
                <div className="text-[10px] text-brand-500">1,038 Reviews</div>
              </motion.div>

              <motion.div
                className="absolute bottom-16 -right-4 sm:-right-10 bg-brand-600 text-white rounded-2xl shadow-xl px-4 py-3 z-20"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-display font-bold">30% OFF</div>
                <div className="text-[10px] opacity-80">Limited Time</div>
              </motion.div>
            </div>

            {/* Floating ingredient blobs */}
            <motion.div
              className="absolute top-1/4 -left-8 text-4xl"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🌾
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 -right-4 sm:-right-12 text-3xl"
              animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              🌿
            </motion.div>
            <motion.div
              className="absolute top-0 left-1/4 text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
      >
        <span className="text-[10px] uppercase tracking-widest text-brand-400 font-medium">Scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-brand-400 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
