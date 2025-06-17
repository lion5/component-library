import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

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
      '@leaflet': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
