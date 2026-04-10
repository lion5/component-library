import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'cobertura'],
      reportsDirectory: 'coverage'
    },
    projects: [
      {
        plugins: [vue()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          css: true,
          include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        },
        resolve: {
          alias: {
            '@core': resolve(__dirname, './src')
          }
        }
      },
      {
        plugins: [
          vue(),
          storybookTest({ configDir: resolve(__dirname, '.storybook') })
        ],
        test: {
          name: 'storybook',
          // Use defaults/automatic resolution handled by storybook plugin
          setupFiles: ['.storybook/vitest.setup.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          }
        },
        resolve: {
          alias: {
            '@core': resolve(__dirname, './src')
          }
        }
      }
    ]
  },
})
