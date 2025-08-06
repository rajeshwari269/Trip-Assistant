import React, { useState, useEffect } from 'react';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';

/**
 * NetworkStatusBar component displays a bar at the top of the screen 
 * indicating network status changes
 */
const NetworkStatusBar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Show the status bar for 5 seconds when coming back online
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      // Always show the offline status
      setIsVisible(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`position-fixed top-0 start-0 w-100 p-2 d-flex justify-content-center align-items-center z-index-1050 ${
        isOnline ? 'bg-success text-white' : 'bg-danger text-white'
      }`}
      role="alert"
      aria-live="polite"
    >
      {isOnline ? (
        <>
          <FaWifi className="me-2" /> 
          <span>You're back online!</span>
        </>
      ) : (
        <>
          <FaExclamationTriangle className="me-2" /> 
          <span>You're offline. Check your connection.</span>
        </>
      )}
    </div>
  );
};

export default NetworkStatusBar;
