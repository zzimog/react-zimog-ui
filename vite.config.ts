import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
//import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';
//import dts from 'vite-plugin-dts';
//import pkg from './package.json';

export default defineConfig({
  base: '/react-zimog-ui',
  resolve: {
    alias: {
      '@ui': resolve(__dirname, './src/ui'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    //tsconfigPaths(),
    tailwindcss(),
    /*
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.ui.json',
    }),
    */
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
