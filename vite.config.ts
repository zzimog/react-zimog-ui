import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

//import pkg from './package.json';

export default defineConfig({
  base: '/react-zimog-ui',
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@ui': resolve(__dirname, 'src/ui'),
    },
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx(),
    },
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, `dist/index.html`),
          resolve(__dirname, `dist/404.html`)
        );
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  /*
  build: {
    copyPublicDir: false,
    lib: {
      entry: './src/ui/index.ts',
      name: 'zimog-ui',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(pkg.peerDependencies || {}),
      ],
    },
  },
  */
});
