'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  staggerContainerVariants,
  sectionBadgeVariants,
  sectionHeadingVariants,
  sectionDescVariants,
  buttonRevealVariants,
  fadeUpVariants,
  viewportConfig,
} from '@/lib/animations';

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=80"
          alt="Organic wheat fields"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/85 via-brand-900/75 to-earth-900/70" />
      </motion.div>

      {/* Floating organic blobs */}
      <motion.div
        className="absolute top-10 left-10 text-6xl opacity-20 pointer-events-none"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌾
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-5xl opacity-20 pointer-events-none"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        🌿
      </motion.div>

      <motion.div
        className="relative z-10 section-pad max-w-screen-2xl mx-auto w-full text-center"
        style={{ y: textY }}
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.span variants={sectionBadgeVariants} className="text-xs uppercase tracking-widest text-earth-300 font-semibold mb-5 block">
          Purity Awaits
        </motion.span>

        <motion.h2
          variants={sectionHeadingVariants}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          Bring Purity Back to{' '}
          <span className="text-earth-300">Your Kitchen.</span>
        </motion.h2>

        <motion.p
          variants={sectionDescVariants}
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join 50,000+ Indian families who have returned to eating the way their grandparents did — clean, honest, nourishing food.
        </motion.p>

        <motion.div variants={buttonRevealVariants} className="flex flex-wrap gap-4 justify-center">
          <motion.a
            id="final-cta-btn"
            href="#products"
            className="btn-earth text-base px-10 py-4 shadow-xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Products <ArrowRight size={18} />
          </motion.a>
          <motion.a
            id="final-learn-more-btn"
            href="#why-us"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-medium px-8 py-4 rounded-full transition-all duration-300 text-base"
            whileHover={{ scale: 1.03 }}
          >
            Learn Our Story
          </motion.a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-14 text-white/60 text-sm"
        >
          {[
            { icon: '🔬', text: '20+ Lab Tests' },
            { icon: '🐄', text: 'Certified A2 Milk' },
            { icon: '🌾', text: '100% Organic' },
            { icon: '🚚', text: 'Free Delivery ₹999+' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
