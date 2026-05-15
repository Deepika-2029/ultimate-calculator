import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // No proxy needed — Netlify Functions handle /api/* in production
  // For local testing use: netlify dev
});
