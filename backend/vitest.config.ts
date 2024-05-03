import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ['**/data/**', '**/node_modules/**', '**/dist/**'],
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/data/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/src/infra/persistence/**',
        '**/src/infra/env/**',
        '**/src/infra/http/validations/**',
        '**/src/infra/http/dto/**',
      ],
    },
  },
});
