import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles/liquid-glass.css'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  tsconfig: 'tsconfig.build.json',
  esbuildOptions(options) {
    options.loader = {
      '.css': 'copy'
    };
  }
});
