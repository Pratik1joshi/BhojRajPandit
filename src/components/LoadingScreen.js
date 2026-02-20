'use client';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #c2410c 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Spinning rings + Om */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-orange-200"
            style={{ borderTopColor: '#c2410c', borderRightColor: '#ea580c' }}
          />

          {/* Inner ring (counter‑rotate) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border-2 border-orange-100"
            style={{ borderBottomColor: '#fb923c', borderLeftColor: '#fdba74' }}
          />

          {/* Pulsing Om symbol */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="text-5xl"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(194,65,12,0.25))',
              }}
            >
              🕉️
            </span>
          </motion.div>
        </div>

        {/* Bouncing dots */}
        <div className="flex gap-1.5 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
            />
          ))}
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-400 text-xs font-medium tracking-[0.2em] uppercase select-none"
        >
          Loading
        </motion.p>
      </div>

      {/* Sliding progress accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-100 overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        />
      </div>
    </motion.div>
  );
}
