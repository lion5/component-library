import type { StorybookConfig } from '@storybook/vue3-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Resolves the absolute path of a package.
 * Needed in monorepo setups where storybook addons may not resolve correctly.
 */
export function getAbsolutePath(value: string): string {
  const resolvedUrl = import.meta.resolve(`${value}/package.json`)
  return dirname(fileURLToPath(resolvedUrl))
}

/** Filters out the vite-plugin-dts plugin which conflicts with storybook builds */
export function filterDtsPlugin(plugins: unknown[] | undefined): unknown[] {
  return (plugins ?? []).filter((plugin) => (plugin as { name?: string })?.name !== 'vite:dts')
}

export const sharedAddons: string[] = [
  getAbsolutePath('@storybook/addon-onboarding'),
  getAbsolutePath('@storybook/addon-a11y'),
  getAbsolutePath('@storybook/addon-vitest'),
  getAbsolutePath('@storybook/addon-docs'),
  getAbsolutePath('@storybook/addon-designs'),
]

export const baseStorybookConfig: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: sharedAddons,
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.json',
      },
    },
  },
  docs: {
    defaultName: 'Documentation',
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: filterDtsPlugin(config.plugins),
    }
  },
}


