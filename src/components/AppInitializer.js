'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useDataCache } from '@/context/DataCacheContext';
import LoadingScreen from './LoadingScreen';

export default function AppInitializer({ children }) {
  const { preloadEssentialData } = useDataCache();
  const [showLoading, setShowLoading] = useState(true);
  const hasLoaded = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    // Safety timeout — never block the user for more than 10 s
    const timeout = setTimeout(() => setShowLoading(false), 10000);

    preloadEssentialData().then(() => {
      // Brief pause so the exit animation feels smooth
      setTimeout(() => setShowLoading(false), 400);
    });

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {/* Loading overlay — skipped for admin routes */}
      {!isAdmin && (
        <AnimatePresence>
          {showLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>
      )}

      {/* App content renders underneath so Next.js SSR is preserved */}
      {children}
    </>
  );
}
