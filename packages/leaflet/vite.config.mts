import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { createLibraryConfig } from '../vite.lib.config'
import packageJson from './package.json'

export default defineConfig(createLibraryConfig({
  dirname: fileURLToPath(new URL('.', import.meta.url)),
  alias: { '@leaflet': fileURLToPath(new URL('./src', import.meta.url)) },
  externals: Object.keys(packageJson.dependencies),
}))
