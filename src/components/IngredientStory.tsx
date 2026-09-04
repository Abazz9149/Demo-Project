'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUpVariants, staggerContainerVariants, viewportConfig } from '@/lib/animations';

const ingredientCards = [
  {
    id: '1',
    title: 'From Native Geographies to Ideal Growing Seasons',
    description: 'We care for every factor when sourcing local ingredients — altitude, soil, water, and harvest timing. The terroir matters.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    accent: 'from-brand-900/80 to-brand-700/40',
  },
  {
    id: '2',
    title: 'What Do We Look For?',
    description: 'Not high yield. Not lower cost. Just pure flavour, nutrition, and soul — the qualities that make native varieties irreplaceable.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    accent: 'from-earth-900/75 to-earth-700/30',
  },
  {
    id: '3',
    title: 'Only the Best Ingredients',
    description: "If an ingredient doesn't meet our standards — in purity, provenance, or nutrition — it simply doesn't make it to your kitchen.",
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800&q=80',
    accent: 'from-brand-950/80 to-brand-800/30',
  },
];

export default function IngredientStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="ingredients" ref={ref} className="py-20 lg:py-28 bg-brand-950 relative overflow-hidden">
      {/* Parallax texture */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
      </motion.div>

      <div className="section-pad max-w-screen-2xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.span variants={fadeUpVariants} className="text-xs uppercase tracking-widest text-earth-400 font-semibold mb-3 block">
            Our Philosophy
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Native Ingredients.{' '}
            <span className="text-earth-400">No Substitutes.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-brand-200/70 text-lg max-w-xl mx-auto">
            Great food starts with great ingredients. We go to extraordinary lengths so you don't have to compromise.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {ingredientCards.map((card, index) => (
            <IngredientCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientCard({
  card,
  index,
}: {
  card: (typeof ingredientCards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Parallax Image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} transition-opacity duration-300`} />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <motion.h3
          className="font-display text-xl sm:text-2xl font-bold text-white mb-3 leading-snug"
          initial={{ y: 10, opacity: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          viewport={{ once: true }}
        >
          {card.title}
        </motion.h3>
        <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}
