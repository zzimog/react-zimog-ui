import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.ui.json',
    }),
  ],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: './src/index.ts',
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
