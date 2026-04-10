import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { createLibraryConfig } from '../vite.lib.config'
import packageJson from './package.json'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(createLibraryConfig({
  dirname: fileURLToPath(new URL('.', import.meta.url)),
  alias: { '@core': fileURLToPath(new URL('./src', import.meta.url)) },
  externals: Object.keys(packageJson.peerDependencies),
  plugins: [vueDevTools()],
}))
