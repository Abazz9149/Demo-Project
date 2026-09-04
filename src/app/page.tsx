'use client';

import { useState, useCallback } from 'react';
import type { Product } from '@/lib/types';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import IngredientStory from '@/components/IngredientStory';
import StorytellingScroll from '@/components/StorytellingScroll';
import FeaturedProduct from '@/components/FeaturedProduct';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import CustomCursor from '@/components/CustomCursor';

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQty = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <CustomCursor />
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <ProductSection onAddToCart={handleAddToCart} />
        <WhyChooseUs />
        <IngredientStory />
        <StorytellingScroll />
        <FeaturedProduct onAddToCart={handleAddToCart} />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
    </>
  );
}
