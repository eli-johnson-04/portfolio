import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      input: './index.html',
      output: {
        entryFileNames: `assets/[name].[hash].js`, // structure defining how output files are named
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure .jsx files are resolved
  },
  base: './', // Ensure relative paths for assets
  root: './', // Set the root to the current directory
  server: {
    open: true, // Open the browser when the server starts
  },
  assetsInclude: ['**/*.md'],
});