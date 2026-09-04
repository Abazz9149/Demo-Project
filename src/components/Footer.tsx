'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Twitter, Youtube, Facebook, ArrowRight, Mail } from 'lucide-react';
import { fadeUpVariants, staggerContainerVariants, viewportConfig } from '@/lib/animations';

const footerLinks = {
  Shop: ['Desi Ghee', 'Cold Pressed Oils', 'Protein Atta', 'Khapli Atta', 'Millets', 'Superfoods', 'Combos'],
  Company: ['Our Story', 'Farm Partners', 'Quality Process', 'Blog', 'Careers'],
  Support: ['Track Order', 'Returns & Refunds', 'FAQ', 'Contact Us', 'Bulk Orders'],
};

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'X (Twitter)' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-950 text-brand-200">
      {/* Newsletter bar */}
      <div className="border-b border-brand-800">
        <div className="section-pad max-w-screen-2xl mx-auto py-10">
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUpVariants} className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={16} className="text-earth-400" />
                <span className="text-white font-semibold text-lg font-display">Stay in the Know</span>
              </div>
              <p className="text-brand-400 text-sm">Get recipes, offers, and ingredient stories in your inbox.</p>
            </motion.div>
            <motion.form
              variants={fadeUpVariants}
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full sm:w-auto"
            >
              {subscribed ? (
                <div className="bg-green-900/30 text-green-400 border border-green-700/40 rounded-full px-5 py-2.5 text-sm font-medium w-full sm:w-auto text-center">
                  ✓ You're subscribed!
                </div>
              ) : (
                <>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 sm:w-64 bg-brand-900 border border-brand-700 rounded-full px-5 py-2.5 text-sm text-white placeholder-brand-500 outline-none focus:border-brand-500 transition-colors"
                    required
                  />
                  <button
                    id="newsletter-submit"
                    type="submit"
                    className="bg-earth-500 hover:bg-earth-600 text-white rounded-full px-5 py-2.5 text-sm font-medium transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    Subscribe <ArrowRight size={14} />
                  </button>
                </>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-pad max-w-screen-2xl mx-auto py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-full flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">VedaRoots</span>
            </div>
            <p className="text-brand-400 text-sm leading-relaxed mb-6 max-w-xs">
              Bringing traditional Indian wisdom back to your kitchen. Pure ingredients, honest processing, real nutrition.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-brand-700 flex items-center justify-center text-brand-400 hover:border-brand-500 hover:text-white transition-all duration-200"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['FSSAI Licensed', 'Organic India Certified', 'Lab Tested'].map((badge) => (
                <span key={badge} className="text-[10px] font-medium text-brand-400 border border-brand-800 px-2.5 py-1 rounded-full">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-brand-400 hover:text-brand-200 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-brand-800">
        <div className="section-pad max-w-screen-2xl mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-500">
          <p>© 2026 VedaRoots. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
