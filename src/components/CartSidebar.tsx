'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartSidebar({ isOpen, onClose, items, onUpdateQty, onRemove }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            id="cart-sidebar"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-cream-50 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-600" />
                <span className="font-display font-semibold text-brand-900 text-lg">
                  Your Cart
                </span>
                {totalItems > 0 && (
                  <span className="bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-2 text-brand-500 hover:text-brand-700 hover:bg-brand-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-6xl">🛒</div>
                  <p className="text-brand-600 font-medium">Your cart is empty</p>
                  <p className="text-brand-400 text-sm">Add some pure, organic goodness!</p>
                  <button
                    onClick={onClose}
                    className="btn-primary text-sm mt-2"
                  >
                    Start Shopping
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-cream-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-900 text-sm leading-snug truncate">{item.name}</p>
                        {item.weight && <p className="text-[11px] text-brand-400">{item.weight}</p>}
                        <p className="text-brand-700 font-bold text-sm mt-1">
                          ₹{(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-700 transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-brand-800 font-semibold text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-700 transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                      <button
                        id={`remove-${item.id}`}
                        onClick={() => onRemove(item.id)}
                        className="p-1.5 text-brand-300 hover:text-red-500 transition-colors self-start flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-200 px-6 py-5 space-y-3">
                <div className="flex justify-between text-brand-700">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-green-600 text-sm">
                  <span>Free delivery</span>
                  <span>₹999+ orders</span>
                </div>
                <button id="checkout-btn" className="btn-primary w-full justify-center text-base py-3.5">
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-brand-400 hover:text-brand-600 transition-colors py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
