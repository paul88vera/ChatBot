import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, // replace `process.env` with empty object in browser
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/widget-entry.jsx",
      name: "ChatWidget",
      fileName: "widget",
      formats: ["iife"],
    },
  },
});
