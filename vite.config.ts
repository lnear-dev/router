// @ts-check
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Lnear Router',
      fileName: 'lnear-router',
      formats: ['es'],
    },
  },
  resolve: { alias: { src: resolve('src/') } },
  plugins: [dts({ rollupTypes: true })],
});

