import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Output directory for the build
    rollupOptions: {
      input: {
        main: './index.html'
      },
      external: []
    }
  },
  base: '',
  root: './', // Set the root to the current directory
  server: {
    open: true, // Open the browser when the server starts
  },
  assetsInclude: ['**/*.md']
});