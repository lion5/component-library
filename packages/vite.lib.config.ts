import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { copyFileSync } from 'node:fs'
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
        afterBuild: () => {
          // To pass publint and ensure the package is supported by all consumers,
          // we must export types that are read as ESM.
          // See https://github.com/qmhc/vite-plugin-dts/issues/267#issuecomment-1786996676
          copyFileSync(
            resolve(dirname, 'dist/index.d.ts'),
            resolve(dirname, 'dist/index.d.mts'),
          )
        },
      }),
    ],
    build: {
      lib: {
        entry: resolve(dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      rolldownOptions: {
        external: externals,
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    resolve: {
      alias,
    },
  }
}


