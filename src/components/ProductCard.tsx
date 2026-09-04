'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cardVariants } from '@/lib/animations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

const tagStyles: Record<string, string> = {
  'Best Seller': 'bg-earth-500 text-white',
  'New Launch': 'bg-brand-600 text-white',
  'Selling Fast': 'bg-amber-500 text-white',
  'Top Rated': 'bg-purple-600 text-white',
};

export default function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-3xl overflow-hidden group relative flex flex-col"
      style={{ boxShadow: '0 2px 16px rgba(45, 99, 45, 0.07)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(45, 99, 45, 0.14)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-earth-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          -{product.discount}%
        </div>
      )}

      {/* Tag */}
      {product.tag && (
        <div className={`absolute top-3 right-3 z-20 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 ${tagStyles[product.tag]}`}>
          {product.tag === 'Selling Fast' && <Zap size={9} fill="white" />}
          {product.tag}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-50">
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-[11px] text-brand-500 font-medium">{product.rating}</span>
          <span className="text-[11px] text-brand-300">({product.reviewCount})</span>
        </div>

        {/* Name */}
        <h3 className="font-display font-semibold text-brand-900 text-sm sm:text-base leading-snug">
          {product.name}
        </h3>
        {product.weight && (
          <p className="text-[11px] text-brand-400 -mt-1">{product.weight}</p>
        )}

        {/* Description */}
        <p className="text-xs text-brand-500/80 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display font-bold text-brand-800 text-lg">
            ₹{product.discountedPrice.toLocaleString('en-IN')}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-brand-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          id={`add-to-cart-${product.id}`}
          onClick={handleAdd}
          className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-brand-600 hover:bg-brand-700 text-white'
          }`}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            animate={{ rotate: added ? 360 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ShoppingCart size={14} />
          </motion.div>
          {added ? 'Added!' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}
