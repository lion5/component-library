import { fileURLToPath } from 'node:url'
import { createVitestConfig } from '../vitest.lib.config'

export default createVitestConfig({
  dirname: fileURLToPath(new URL('.', import.meta.url)),
  alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  workspaceAlias: {
    '@lion5/component-library': fileURLToPath(new URL('../core/src/index.ts', import.meta.url)),
    '@core': fileURLToPath(new URL('../core/src', import.meta.url)),
  },
})

