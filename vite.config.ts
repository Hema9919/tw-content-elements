import { defineConfig } from 'vite';
import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin(),
  ],
});