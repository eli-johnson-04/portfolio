import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true,
  },
  base: './',
  resolve: {
    extensions: ['.jsx', '.js'], // Ensure .jsx files are resolved
  },
  server: {
    open: true, // Open the browser when the server starts
  },
  assetsInclude: ['**/*.md'],
});