'use client';
import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

const DataCacheContext = createContext(null);

export function DataCacheProvider({ children }) {
  const [cache, setCache] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const cacheRef = useRef({});
  const fetchingRef = useRef({});

  const fetchAndCache = useCallback(async (key, url) => {
    // Already cached — return instantly
    if (cacheRef.current[key]) return cacheRef.current[key];

    // Already fetching this key — return the in-flight promise
    if (fetchingRef.current[key]) return fetchingRef.current[key];

    const promise = axios
      .get(url)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data;
          cacheRef.current[key] = data;
          setCache((prev) => ({ ...prev, [key]: data }));
          return data;
        }
        return null;
      })
      .catch((error) => {
        console.error(`Error fetching ${key}:`, error);
        return null;
      })
      .finally(() => {
        delete fetchingRef.current[key];
      });

    fetchingRef.current[key] = promise;
    return promise;
  }, []);

  const preloadEssentialData = useCallback(async () => {
    await Promise.allSettled([
      fetchAndCache('profile', '/api/profile'),
      fetchAndCache('services', '/api/services'),
      fetchAndCache('testimonials', '/api/testimonials'),
    ]);
    setInitialLoading(false);
  }, [fetchAndCache]);

  return (
    <DataCacheContext.Provider
      value={{ cache, fetchAndCache, preloadEssentialData, initialLoading }}
    >
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  const context = useContext(DataCacheContext);
  if (!context) {
    throw new Error('useDataCache must be used within a DataCacheProvider');
  }
  return context;
}

/* ───────── Convenience hooks ───────── */

export function useProfile() {
  const { cache, fetchAndCache } = useDataCache();
  useEffect(() => {
    if (!cache.profile) fetchAndCache('profile', '/api/profile');
  }, [cache.profile, fetchAndCache]);
  return { profile: cache.profile || null, loading: !cache.profile };
}

export function useServices() {
  const { cache, fetchAndCache } = useDataCache();
  useEffect(() => {
    if (!cache.services) fetchAndCache('services', '/api/services');
  }, [cache.services, fetchAndCache]);
  return { services: cache.services || [], loading: !cache.services };
}

export function useTestimonials() {
  const { cache, fetchAndCache } = useDataCache();
  useEffect(() => {
    if (!cache.testimonials) fetchAndCache('testimonials', '/api/testimonials');
  }, [cache.testimonials, fetchAndCache]);
  return { testimonials: cache.testimonials || [], loading: !cache.testimonials };
}

export function useGallery() {
  const { cache, fetchAndCache } = useDataCache();
  useEffect(() => {
    if (!cache.gallery) fetchAndCache('gallery', '/api/gallery');
  }, [cache.gallery, fetchAndCache]);
  return { gallery: cache.gallery || [], loading: !cache.gallery };
}
