'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const tag = el.tagName.toLowerCase();
        const cursor = window.getComputedStyle(el).cursor;
        setIsPointer(
          tag === 'button' || tag === 'a' || cursor === 'pointer'
        );
      }
    };

    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      rafId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', () => setIsVisible(false));
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: pos.x - 4, y: pos.y - 4 }}
        animate={{ scale: isPointer ? 1.8 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Trailing ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${trail.x - 16}px, ${trail.y - 16}px)`,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1.5px solid ${isPointer ? 'rgba(45,99,45,0.5)' : 'rgba(45,99,45,0.3)'}`,
          transition: 'border-color 0.2s',
        }}
      />
    </>
  );
}
