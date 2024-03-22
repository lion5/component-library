/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ outputDir: './dist/types' })],
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('../core/src', import.meta.url)),
      '@firebase': fileURLToPath(new URL('../firebase/src', import.meta.url)),
      '@gridstack': fileURLToPath(new URL('../gridstack/src', import.meta.url)),
      '@leaflet': fileURLToPath(new URL('../leaflet/src', import.meta.url))
    }
  },
  test: {
    coverage: {
      reporter: ['lcovonly', 'cobertura'],
      reportsDirectory: 'coverage'
    },
    globals: true,
    environment: 'jsdom',
    css: true
  }
})
