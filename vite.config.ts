import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Default Vite output folder
    sourcemap: true, // Optional: for debugging
  },
});
