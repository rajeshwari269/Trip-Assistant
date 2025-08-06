import React from 'react';

/**
 * Utility for optimized dynamic imports
 * This helps with performance tracking, error handling, and retry logic
 */

// Types for our utilities
type ImportFn = () => Promise<any>;
type ComponentType = React.LazyExoticComponent<React.ComponentType<any>>;

/**
 * Enhanced lazy loading with timeout detection
 */
export function lazyLoad(componentImport: ImportFn, timeout = 10000): ComponentType {
  return React.lazy(() => {
    // Track the start time
    const startTime = Date.now();
    
    // Create a promise with timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        // If taking too long, log metrics and reject
        const loadTime = Date.now() - startTime;
        console.warn(`Component load timeout (${loadTime}ms)`);
        reject(new Error(`Loading component took too long (${loadTime}ms)`));
      }, timeout);
    });
    
    // Race the import against the timeout
    return Promise.race([
      componentImport().catch((error: Error) => {
        // Log load failures for monitoring
        console.error('Component load failed: ', error);
        throw error;
      }),
      timeoutPromise
    ])
    .then(component => {
      // Log successful load time for performance monitoring
      const loadTime = Date.now() - startTime;
      if (loadTime > 1000) {
        console.warn(`Slow component load (${loadTime}ms)`);
      }
      return component;
    });
  });
}

/**
 * Preload a component before it's needed
 */
export function preloadComponent(componentImport: ImportFn): void {
  // Start the import but don't wait for it
  componentImport();
}

/**
 * Prefetch critical routes when user hovers over links
 * This can be attached to Link components
 */
export function prefetchOnHover(importFn: ImportFn) {
  return {
    onMouseEnter: () => {
      preloadComponent(importFn);
    },
    onFocus: () => {
      preloadComponent(importFn);
    }
  };
}
