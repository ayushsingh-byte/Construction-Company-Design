'use client';

import { motion, MotionConfig } from 'framer-motion';
import { EASE } from '@/components/motion';

// Remounts on every navigation, so each route gets an enter transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
