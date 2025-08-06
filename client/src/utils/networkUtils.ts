import { useState, useEffect } from 'react';

/**
 * Network status utilities for detecting and responding to online/offline status changes
 */

/**
 * Hook to detect network status and listen for changes
 * 
 * @param {Function} onStatusChange - Callback when network status changes
 * @returns {boolean} isOnline - Current online status
 */
export function useNetworkStatus(onStatusChange?: (online: boolean) => void): boolean {
  if (typeof window === 'undefined') return true;
  
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onStatusChange) onStatusChange(true);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (onStatusChange) onStatusChange(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onStatusChange]);
  
  return isOnline;
}

/**
 * Checks if the device is currently online
 * @returns {boolean} True if online, false if offline
 */
export function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
}

/**
 * Creates a timeout promise to use with fetch for better error handling
 * @param {number} ms - Milliseconds before timeout
 * @returns {Promise<never>} A promise that rejects after the timeout
 */
export function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
}

/**
 * Fetches data with timeout and better error handling
 * @param {string} url - URL to fetch
 * @param {RequestInit} options - Fetch options
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise<Response>} Fetch response
 */
export async function fetchWithTimeout(
  url: string, 
  options: RequestInit = {}, 
  timeoutMs = 10000
): Promise<Response> {
  if (!isOnline()) {
    throw new Error('You appear to be offline. Please check your internet connection.');
  }
  
  return Promise.race([
    fetch(url, options),
    timeout(timeoutMs)
  ]);
}
