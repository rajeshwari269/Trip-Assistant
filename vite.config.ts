import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "88b39973-a5f8-43c2-b1af-e0eacbc85c99-00-2welbeymh8max.pike.replit.dev"
    ]
  },
  plugins: [react(), tailwindcss()]
});