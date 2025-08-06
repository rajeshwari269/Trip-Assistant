import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Only import critical bootstrap CSS at initial load
// Other bootstrap components will be loaded when needed
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

// Preload critical resources
const preloadStylesheets = () => {
  // Add preload links for critical resources
  // Using absolute path to ensure correct resolution
  const bootstrapIconsCssUrl = '/node_modules/bootstrap-icons/font/bootstrap-icons.css';
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'style';
  preloadLink.href = bootstrapIconsCssUrl;
  document.head.appendChild(preloadLink);
};

// Execute preload strategy
preloadStylesheets();

// Create root and render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
