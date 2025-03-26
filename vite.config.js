import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true,
  },
  base: './', // Ensure relative paths for assets
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure .jsx files are resolved
  },
  server: {
    open: true, // Open the browser when the server starts
  },
  assetsInclude: ['**/*.md'],
});