'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/data';
import {
  sectionBadgeVariants,
  sectionHeadingVariants,
  sectionDescVariants,
  cardStaggerVariants,
  cardItemVariants,
  iconRevealVariants,
  textRevealVariants,
  staggerContainerVariants,
  viewportConfig,
} from '@/lib/animations';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-50/60 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-cream-100/80 rounded-full blur-3xl" />
      </div>

      <div className="section-pad max-w-screen-2xl mx-auto relative">
        {/* Heading: animates first */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.span variants={sectionBadgeVariants} className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3 block">
            Our Promise
          </motion.span>
          <motion.h2 variants={sectionHeadingVariants} className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
            Why Choose VedaRoots?
          </motion.h2>
          <motion.p variants={sectionDescVariants} className="text-brand-600/70 text-lg max-w-xl mx-auto">
            We built this brand on one belief: that food should be honest. Here is what that means to us.
          </motion.p>
        </motion.div>

        {/* Feature Cards: sequential reveal */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={cardStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardItemVariants}
              className="group relative bg-cream-50 rounded-3xl p-7 border border-cream-200/50 hover:border-brand-200 transition-all duration-300 hover:shadow-lg flex flex-col"
              whileHover={{ y: -4 }}
            >
              {/* Icon: scale 0.85 -> 1, opacity 0 -> 1 */}
              <motion.div
                className="text-4xl mb-5 inline-block origin-left"
                variants={iconRevealVariants}
              >
                {feature.icon}
              </motion.div>

              {/* Number */}
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-brand-100 select-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Text: opacity 0 -> 1, y 20 -> 0 */}
              <motion.div variants={textRevealVariants} className="flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-brand-900 text-lg mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-500 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </motion.div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gradient-to-r from-brand-300 to-transparent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
