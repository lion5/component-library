import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'

export interface VitestLibConfigOptions {
  dirname: string
  alias: Record<string, string>
  /** Aliases for workspace packages (e.g. resolving @lion5/component-library to source).
   *  Only applied to unit tests — storybook tests resolve via the built package. */
  workspaceAlias?: Record<string, string>
  includeStorybook?: boolean
}

export function createVitestConfig({
  dirname,
  alias,
  workspaceAlias = {},
  includeStorybook = true,
}: VitestLibConfigOptions) {
  const unitAlias = { ...alias, ...workspaceAlias }

  const unitProject = {
    plugins: [vue()],
    test: {
      name: 'unit',
      environment: 'jsdom' as const,
      globals: true,
      css: true,
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
    resolve: { alias: unitAlias },
  }

  const storybookProject = {
    plugins: [
      vue(),
      storybookTest({ configDir: resolve(dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      setupFiles: ['.storybook/vitest.setup.ts'],
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: 'chromium' as const }],
      },
    },
    resolve: { alias },
  }

  return defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['lcovonly', 'cobertura'],
        reportsDirectory: 'coverage',
      },
      projects: includeStorybook
        ? [unitProject, storybookProject]
        : [unitProject],
    },
  })
}


