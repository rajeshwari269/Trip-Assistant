import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Only import critical bootstrap CSS at initial load
// Other bootstrap components will be loaded when needed
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

// Preload critical resources
const preloadStylesheets = () => {
  // Add bootstrap-icons CSS directly instead of preloading
  const iconLink = document.createElement("link");
  iconLink.rel = "stylesheet";
  iconLink.href =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css";
  document.head.appendChild(iconLink);
};

// Execute preload strategy
preloadStylesheets();

// Create root and render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
