import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'cobertura'],
      reportsDirectory: 'coverage'
    }
  },
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src')
    }
  }
})
