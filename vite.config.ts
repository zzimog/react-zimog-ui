//import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  server: {
    open: true,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: './lib/zimog-ui/index.ts',
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
});
