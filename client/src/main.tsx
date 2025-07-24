import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner"
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors closeButton position="top-center" />
  </StrictMode>
);
