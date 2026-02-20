'use client';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { DataCacheProvider } from '@/context/DataCacheContext';
import AppInitializer from './AppInitializer';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <DataCacheProvider>
        <AppInitializer>
          {children}
        </AppInitializer>
        <Toaster position="top-right" />
      </DataCacheProvider>
    </SessionProvider>
  );
}
