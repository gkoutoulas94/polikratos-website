import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        deletion: resolve(import.meta.dirname, 'delete-account.html'),
        support: resolve(import.meta.dirname, 'support.html'),
        notFound: resolve(import.meta.dirname, '404.html')
      }
    }
  }
});
