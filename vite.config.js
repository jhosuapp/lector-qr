import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'sources',
  server: {
    open: '/templates/index.html',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'sources/js/app.js'),
      name: 'Mainscript',
      fileName: 'js/mainscript'
    },
    rollupOptions: {
      output: {
        assetFileNames: "css/main.css",
      },
    },
    sourcemap: true,
    devtool: 'source-map',
    target: "es2015",
    outDir: '../dist/',
    emptyOutDir: false,
  },
});