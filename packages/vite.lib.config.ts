import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import type { PluginOption, UserConfig } from 'vite'

export interface LibraryConfigOptions {
  dirname: string
  alias: Record<string, string>
  externals: string[]
  plugins?: PluginOption[]
}

export function createLibraryConfig({
  dirname,
  alias,
  externals,
  plugins = [],
}: LibraryConfigOptions): UserConfig {
  return {
    plugins: [
      vue(),
      ...plugins,
      dts({
        rollupTypes: true,
        tsconfigPath: resolve(dirname, 'tsconfig.json'),
      }),
    ],
    build: {
      lib: {
        entry: resolve(dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: 'index',
      },
      rolldownOptions: {
        external: externals,
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    resolve: {
      alias,
    },
  }
}
