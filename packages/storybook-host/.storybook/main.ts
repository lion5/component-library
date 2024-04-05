import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: '',
      directory: './src',
      files: '**/*.stories.@(js|jsx|ts|tsx)'
    },
    {
      titlePrefix: '',
      directory: '../src',
      files: '**/*.mdx'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@ljcl/storybook-addon-cssprops'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  },
  refs: {
    core: {
      title: 'Core',
      url: '/component-library/core/'
    },
    firebase: {
      title: 'Firebase',
      url: '/component-library/firebase/'
    },
    gridstack: {
      title: 'Gridstack',
      url: '/component-library/gridstack/'
    },
    leaflet: {
      title: 'Leaflet',
      url: '/component-library/leaflet/'
    }
  }
}
export default config
