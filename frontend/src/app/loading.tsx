// app/loading.tsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      {/* Logo centrale con animazione pulsante */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="mb-8"
      >
        <Image
          src="/images/logo-zmp-group-w.png"
          alt="ZMP Logo"
          width={160}
          height={160}
          className="object-contain"
        />
      </motion.div>

      {/* Testo animato */}
      <motion.p
        className="text-white text-lg tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
      >
        Loading ...
      </motion.p>
    </div>
  );
}