import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
//import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
//import pkg from './package.json';

export default defineConfig({
  base: '/ui-wip',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
    /*
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
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
