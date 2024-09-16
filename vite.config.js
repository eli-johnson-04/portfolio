import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Set the root to the current directory
  build: {
    outDir: 'dist', // Output directory for the build
  },
  server: {
    open: true, // Open the browser when the server starts
  },  
});