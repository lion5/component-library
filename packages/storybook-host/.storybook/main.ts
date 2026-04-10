import type { StorybookConfig } from '@storybook/vue3-vite'
import { getAbsolutePath, sharedAddons } from '../../storybook.shared.ts'

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: '',
      directory: './src',
      files: '**/*.stories.@(js|jsx|ts|tsx)',
    },
    {
      titlePrefix: '',
      directory: '../src',
      files: '**/*.mdx',
    },
  ],
  addons: sharedAddons,
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  refs: {
    core: {
      title: 'Core',
      url: '/component-library/core/',
    },
    firebase: {
      title: 'Firebase',
      url: '/component-library/firebase/',
    },
    gridstack: {
      title: 'Gridstack',
      url: '/component-library/gridstack/',
    },
    leaflet: {
      title: 'Leaflet',
      url: '/component-library/leaflet/',
    },
  },
}
export default config

