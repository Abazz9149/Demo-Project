'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { fadeUpVariants, staggerContainerVariants, viewportConfig } from '@/lib/animations';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-28 relative overflow-hidden bg-white">
      {/* Background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-brand-50/40 to-transparent" />
      </motion.div>

      <div className="section-pad max-w-screen-2xl mx-auto relative">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.span variants={fadeUpVariants} className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
            Customer Stories
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
            Families Trust VedaRoots
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-brand-600/70 text-lg max-w-xl mx-auto">
            Over 50,000 families have made the switch. Here is what they say.
          </motion.p>
        </motion.div>

        {/* Active Testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="bg-cream-50 rounded-3xl p-8 sm:p-12 relative border border-cream-200/60"
              style={{ boxShadow: '0 4px 40px rgba(45, 99, 45, 0.08)' }}
            >
              <Quote size={40} className="text-brand-200 absolute top-6 right-8" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-brand-700 text-lg sm:text-xl leading-relaxed font-medium mb-8 relative z-10">
                &ldquo;{testimonials[activeIndex].review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-200">
                  <Image
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-brand-900">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-brand-500">{testimonials[activeIndex].location}</div>
                  <div className="text-xs text-brand-400 mt-0.5">
                    Purchased: <span className="text-brand-600 font-medium">{testimonials[activeIndex].product}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            id="testimonial-prev"
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                id={`testimonial-dot-${i}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2.5 bg-brand-600'
                    : 'w-2.5 h-2.5 bg-brand-200 hover:bg-brand-300'
                }`}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Thumbnail row */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              id={`testimonial-thumb-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`relative w-10 h-10 rounded-full overflow-hidden transition-all duration-200 ring-2 ${
                i === activeIndex ? 'ring-brand-500 scale-110' : 'ring-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View ${t.name}'s review`}
            >
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
