'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  sectionBadgeVariants,
  sectionHeadingVariants,
  sectionDescVariants,
  staggerContainerVariants,
  viewportConfig,
} from '@/lib/animations';

const stages = [
  {
    id: 'farm',
    step: '01',
    title: 'From the Farm',
    description: 'Native seeds. Traditional varieties. Grown in ideal Indian geographies — by farmers who have been cultivating for generations.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    emoji: '🌾',
  },
  {
    id: 'process',
    step: '02',
    title: 'Traditional Processing',
    description: 'Bilona churning. Stone milling. Cold pressing. Slow, careful methods that preserve every nutrient the way nature packed them.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80',
    emoji: '🏺',
  },
  {
    id: 'kitchen',
    step: '03',
    title: 'Your Kitchen',
    description: "After 20+ quality tests, your order is carefully packed and delivered — fresh, pure, and exactly as it came from the source.",
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    emoji: '🍳',
  },
];

export default function StorytellingScroll() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/60 overflow-hidden">
      {/* Section heading */}
      <motion.div
        className="section-pad max-w-screen-2xl mx-auto text-center mb-20"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.span variants={sectionBadgeVariants} className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
          The Journey
        </motion.span>
        <motion.h2 variants={sectionHeadingVariants} className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
          Farm <span className="text-earth-500">→</span> Process <span className="text-earth-500">→</span> Kitchen
        </motion.h2>
        <motion.p variants={sectionDescVariants} className="text-brand-600/70 text-lg max-w-xl mx-auto">
          We believe you deserve to know exactly how your food is made. No mystery. No compromises.
        </motion.p>
      </motion.div>

      {/* Stages */}
      <div className="space-y-0">
        {stages.map((stage, index) => (
          <StageCard key={stage.id} stage={stage} index={index} />
        ))}
      </div>
    </section>
  );
}

function StageCard({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.35],
    [index % 2 === 0 ? '-40px' : '40px', '0px']
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[60vh] lg:min-h-[70vh]`}
    >
      {/* Image Side */}
      <div className="relative flex-1 overflow-hidden min-h-[50vw] lg:min-h-0">
        <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
          <Image
            src={stage.image}
            alt={stage.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-brand-900/20" />
        </motion.div>

        {/* Emoji floating */}
        <motion.div
          className="absolute top-8 left-8 text-5xl z-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['-15px', '15px']) }}
        >
          {stage.emoji}
        </motion.div>
      </div>

      {/* Text Side */}
      <div className={`flex-1 flex items-center bg-white`}>
        <motion.div
          className="section-pad py-12 lg:py-0 max-w-lg mx-auto lg:mx-0 lg:pl-16 lg:pr-10"
          style={{ x: textX, opacity: textOpacity }}
        >
          <div className="font-display text-7xl font-bold text-brand-100 leading-none mb-4 select-none">
            {stage.step}
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-tight">
            {stage.title}
          </h3>
          <p className="text-brand-600/70 text-lg leading-relaxed">
            {stage.description}
          </p>

          <div className="mt-8 h-0.5 w-16 bg-gradient-to-r from-brand-400 to-earth-400 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
