import { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from 'sonner';

// Core components that should be loaded immediately
import "./App.css";
import Navbar from "./components/Navigation";
import Footer from "./components/footer";
import NetworkStatusBar from './components/NetworkStatusBar';
// Style and Configuration Imports
import "./responsive.css";

// Loading skeleton component
import LoadingState from "./components/LoadingState";
// Route configuration and lazy loading
import { routes, prefetchCriticalRoutes } from './utils/routeConfig';

// Prefetch critical routes after initial render
setTimeout(prefetchCriticalRoutes, 1000);

function AppContent() {
  const location = useLocation(); // Get the current route

  // Determine if the header and footer should be shown
  const showHeaderFooter =
    location.pathname !== "/auth" && location.pathname !== "/admin";
  const showFooter =
    showHeaderFooter &&
    location.pathname !== "/find-friends" &&
    location.pathname !== "/help";

  return (
    <>
      <NetworkStatusBar />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "toast-notification"
        }} 
      />
      
      {/* Show Navbar only if NOT on the Auth or Admin page */}
      {showHeaderFooter && <Navbar />}

      {/* --- THIS IS THE FIX --- */}
      {/* We add top padding to the main content area ONLY when the navbar is visible.
          This prevents the page content from being hidden underneath the fixed navbar. 
      */}
      <main
        style={{
          paddingTop:
            showHeaderFooter && location.pathname !== "/help" ? "80px" : "0",
        }}
      >
        <Suspense fallback={<LoadingState size="lg" />}>
          <Routes>
            {routes.map(route => (
              <Route 
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </main>

      {/* Conditionally render the Footer */}
      {showFooter && <Footer />}
    </>
  );
}

// Performance monitoring hook for functional components
function useRenderLogger(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const start = performance.now();
      return () => {
        const end = performance.now();
        console.log(`[Performance] ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
      };
    }
  });
}

function App() {
  // Apply performance monitoring in development only
  if (process.env.NODE_ENV !== 'production') {
    useRenderLogger('App');
  }
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
