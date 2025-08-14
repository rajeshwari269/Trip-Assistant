import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from 'sonner';

// Core component imports
import Navbar from "./components/Navigation";
import Footer from "./components/footer";
import NetworkStatusBar from './components/NetworkStatusBar';
import LoadingState from "./components/LoadingState";

// Style and Configuration Imports
import "./App.css";
import "./accessibility.css"; // Global accessibility styles from 'main'
import "bootstrap/dist/css/bootstrap.min.css"; // Added from 'currency-converter'
import "./responsive.css";

// Route configuration and lazy loading from 'main'
// IMPORTANT: You must add your new routes (Currency, AboutUsPage, etc.) to this file.
import { routes, prefetchCriticalRoutes } from './utils/routeConfig';

// Prefetch critical routes for better performance
setTimeout(prefetchCriticalRoutes, 1000);

function AppContent() {
  const location = useLocation(); // Get the current route

  // Determine if the header and footer should be shown based on the route
  const showHeaderFooter =
    location.pathname !== "/auth" && location.pathname !== "/admin";
  const showFooter =
    showHeaderFooter &&
    location.pathname !== "/find-friends" &&
    location.pathname !== "/help";

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <NetworkStatusBar />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "toast-notification"
        }} 
      />
      
      {/* Show Navbar conditionally */}
      {showHeaderFooter && <Navbar />}

      {/* Main content area with dynamic padding to prevent overlap with fixed navbar */}
      <main
        id="main-content"
        style={{
          paddingTop:
            showHeaderFooter && location.pathname !== "/help" ? "80px" : "0",
        }}
        role="main"
        tabIndex={-1}
      >
        <Suspense fallback={<LoadingState size="lg" />}>
          <Routes>
            {/* Routes are now mapped from the central routeConfig file */}
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Add performance measurement for development environment
if (process.env.NODE_ENV !== 'production') {
  const actualRender = App.prototype.render || App;
  App.prototype.render = function() {
    const start = performance.now();
    const result = actualRender.apply(this, arguments);
    const end = performance.now();
    console.log(`[Performance] App rendered in ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

export default App;