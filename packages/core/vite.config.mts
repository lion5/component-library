/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import packageJson from './package.json'
import { copyFileSync } from 'node:fs'
import vueDevTools from 'vite-plugin-vue-devtools'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      logLevel: 'info',
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      afterBuild: () => {
        // See https://github.com/qmhc/vite-plugin-dts/issues/267#issuecomment-1786996676
        // To pass publint (`npm x publint@latest`) and ensure the
        // package is supported by all consumers, we must export types that are
        // read as ESM. To do this, there must be duplicate types with the
        // correct extension supplied in the package.json exports field.
        copyFileSync('dist/index.d.ts', 'dist/index.d.mts')
      }
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: Object.keys(packageJson.peerDependencies),
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // test: {
  //   // Moderne projects-basierte Konfiguration
  //   projects: [
  //     {
  //       name: 'unit',
  //       globals: true,
  //       environment: 'jsdom',
  //       css: true,
  //       coverage: {
  //         reporter: ['lcovonly', 'cobertura'],
  //         reportsDirectory: 'coverage'
  //       }
  //     },
  //     {
  //       name: 'storybook',
  //       plugins: [storybookTest({ configDir: resolve(__dirname, '.storybook') })],
  //       browser: {
  //         enabled: true,
  //         headless: true,
  //         provider: 'playwright',
  //         instances: [{ browser: 'chromium' }]
  //       },
  //       setupFiles: ['.storybook/vitest.setup.ts']
  //     }
  //   ]
  // }
})
