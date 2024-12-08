import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/.netlify/functions": "http://localhost:9999",
    },
  },
  plugins: [react()],
});
