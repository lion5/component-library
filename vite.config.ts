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
      '@': fileURLToPath(new URL('./src', import.meta.url))
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
