import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    devtool: 'source-map',
    target: "es2015",
  },
});