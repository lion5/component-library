/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ComponentLibrary',
      fileName: (format) => `library.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vuex',
        'leaflet',
        'firebase',
        'firebase/storage',
        'vee-validate',
        'gridstack',
        '@turf/boolean-point-in-polygon',
        'pinia'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    },
    emptyOutDir: false // to retain the types folder generated by tsc
  },
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
