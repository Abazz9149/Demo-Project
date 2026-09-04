'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/data';
import { fadeUpVariants, staggerContainerVariants, cardVariants, viewportConfig } from '@/lib/animations';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-50/60 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-cream-100/80 rounded-full blur-3xl" />
      </div>

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
            Our Promise
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">
            Why Choose VedaRoots?
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-brand-600/70 text-lg max-w-xl mx-auto">
            We built this brand on one belief: that food should be honest. Here is what that means to us.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group relative bg-cream-50 rounded-3xl p-7 border border-cream-200/50 hover:border-brand-200 transition-all duration-300 hover:shadow-lg"
              whileHover={{ y: -4 }}
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-5 inline-block"
                whileInView={{ scale: [0.5, 1.15, 1] }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {feature.icon}
              </motion.div>

              {/* Number */}
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-brand-100 select-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="font-display font-semibold text-brand-900 text-lg mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gradient-to-r from-brand-300 to-transparent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
