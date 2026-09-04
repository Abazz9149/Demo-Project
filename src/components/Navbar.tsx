'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { navLinks } from '@/lib/data';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-glass shadow-sm border-b border-cream-200/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-pad max-w-screen-2xl mx-auto flex items-center justify-between h-16 sm:h-20">
          {/* Mobile: Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-brand-700"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Leaf size={16} className="text-white" />
            </div>
            <span
              className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-brand-800' : 'text-brand-900'
              }`}
            >
              VedaRoots
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium relative group transition-colors duration-200 ${
                  scrolled
                    ? 'text-brand-700 hover:text-brand-500'
                    : 'text-brand-800 hover:text-brand-600'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              id="search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`p-2 rounded-full transition-colors hover:bg-brand-100 ${
                scrolled ? 'text-brand-700' : 'text-brand-800'
              }`}
            >
              <Search size={18} />
            </button>
            <button
              id="account-btn"
              aria-label="Account"
              className={`hidden sm:flex p-2 rounded-full transition-colors hover:bg-brand-100 ${
                scrolled ? 'text-brand-700' : 'text-brand-800'
              }`}
            >
              <User size={18} />
            </button>
            <button
              id="cart-btn"
              onClick={onCartOpen}
              aria-label={`Cart with ${cartCount} items`}
              className={`p-2 rounded-full relative transition-colors hover:bg-brand-100 ${
                scrolled ? 'text-brand-700' : 'text-brand-800'
              }`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-earth-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-cream-50 z-50 lg:hidden flex flex-col p-6 shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand-600 rounded-full flex items-center justify-center">
                    <Leaf size={14} className="text-white" />
                  </div>
                  <span className="font-display font-bold text-brand-800 text-lg">VedaRoots</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-brand-600 hover:bg-brand-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                    className="text-brand-700 font-medium py-3 px-3 rounded-xl hover:bg-brand-50 hover:text-brand-600 transition-colors text-lg"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-cream-200">
                <p className="text-xs text-brand-400 mb-3">Use code <strong className="text-brand-600">PURE15</strong> for 15% off</p>
                <a href="#products" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center text-sm">
                  Shop Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: -30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-5 py-4 border-b border-gray-100">
                <Search size={18} className="text-brand-500 mr-3 flex-shrink-0" />
                <input
                  id="search-input"
                  type="text"
                  autoFocus
                  placeholder="Search for ghee, oils, atta..."
                  className="flex-1 outline-none text-brand-800 placeholder-brand-300 text-base font-body"
                />
                <button onClick={() => setSearchOpen(false)} className="p-1 text-brand-400 hover:text-brand-600 ml-2">
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-brand-400 mb-3 font-medium uppercase tracking-wider">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Desi Ghee', 'Protein Atta', 'Mustard Oil', 'Khapli', 'Millets'].map((term) => (
                    <span key={term} className="px-3 py-1.5 bg-cream-100 text-brand-600 rounded-full text-sm cursor-pointer hover:bg-brand-100 transition-colors">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
