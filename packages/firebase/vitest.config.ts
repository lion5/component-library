import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    storybookTest({ configDir: resolve(__dirname, '.storybook'), includeUnitTests: true })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    // Alle Tests (Unit + Story) einbeziehen
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/*.stories.{js,ts,jsx,tsx}'
    ],
    // Separate setup for Storybook tests
    setupFiles: ['.storybook/vitest.setup.ts'], // Storybook-specific setup
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

