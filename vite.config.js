import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html',
    },
    assetsInlineLimit: 0, // Ensure assets like fonts are not inlined
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure .jsx files are resolved
  },
  base: '/portfolio/dist', // Use relative paths for assets
  root: './', // Set the root to the current directory
  server: {
    open: true, // Open the browser when the server starts
  },
  assetsInclude: ['**/*.md'],
});