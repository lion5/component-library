import { fileURLToPath } from 'node:url'
import { createVitestConfig } from '../vitest.lib.config'

export default createVitestConfig({
  dirname: fileURLToPath(new URL('.', import.meta.url)),
  alias: { '@core': fileURLToPath(new URL('./src', import.meta.url)) },
})
