import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/login": "http://backend:8000",
      "/register": "http://backend:8000",
      "/success": "http://backend:8000",
      "/auth": "http://backend:8000",
      "/static": "http://backend:8000",
    },
  },
});
