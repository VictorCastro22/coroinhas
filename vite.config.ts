import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // inclui Safari antigo
    }),
  ],
  build: {
    target: 'es2015', // compatível com todos os iPhones
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
