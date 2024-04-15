# Lion5 🦁 Component Library 🎉

This is the Lion5 Component Library. It includes all shared vue3 ui components we use in our projects.
The project setup is done based on [NX](https://nx.dev/) to leverage dependency graph and caching functionalities.

## Getting Started 🚀

### Installation
At the moment we publish our packages to the [NPM registry](https://www.npmjs.com/search?q=%40lion5) and
the [GitHub registry](https://github.com/orgs/lion5/packages?repo_name=component-library).
So you can choose which registry you want to use. But for the ease of use we recommend the NPM registry.

#### NPM Registry
Packages can be found here https://www.npmjs.com/search?q=%40lion5

```shell
npm install @lion5/component-library
pnpm add "@lion5/component-library"
yarn add @lion5/component-library
```

#### Github Registry
Packages can be found here https://github.com/orgs/lion5/packages?repo_name=component-library

The GitHub registry is a bit more complicated to use. The repository is public, but you still need to authenticate with GitHub to install packages from the GitHub registry.

To authenticate with GitHub, you need to create a personal access token (PAT) and use it as your password when prompted for a password. You can create a PAT by following the instructions [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

For further information on how to install packages from the GitHub registry, please refer to the [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package).

### Usage
Import the component styles in your main style (e.g. `main.scss` or `main.css`) or entry file (e.g. `main.js` or `main.ts`):

```scss
@import '@lion5/component-library/dist/style.css';
// and/or
@import '@lion5/component-library-firebase/dist/style.css';
// and/or
@import '@lion5/component-library-gridstack/dist/style.css';
// and/or
@import '@lion5/component-library-leaflet/dist/style.css';
```

After that you are ready to use the components in your Vue3 project.
Check out our [Documentation](https://lion5.github.io/component-library/)! This is the main reference to all components and composables.

A good first starting point is the guide section. Beginning with the [Colors Guide](https://lion5.github.io/component-library/?path=/docs/core_guide-colors--documentation) to get an overview of the available colors.


## Contributing

### Setup

1. Clone the repository
2. Install dependencies via `npm install`
3. You are ready to go!

### Project Structure

#### Monorepo
The project is structured as a monorepo using [NX](https://nx.dev/). The main parts are:
```
packages/
  component-library/           # Core components shared with all other packages
  component-library-firebase/  # Firebase components
  component-library-gridstack/ # Gridstack components
  component-library-leaflet/   # Leaflet components
  docs/                        # Storybook documentation
```

#### Creating a new component
The structure for a new component should look like this:
```
ComponentName/
  ComponentName.vue        # The component itself
  ComponentName.stories.ts # The storybook stories for the component (documentation)
  ComponentName.spec.ts    # The tests for the component
  ...                      # Other files like styles, assets, etc. that are not shared with other components
```
The folder should be placed in the `src/components` folder of the package you want to add the component to.

The component should be exported in the `index.ts` file in the component folder.

#### Creating a new composable
The structure for a new composable should look like this:
```
useComposableName/
  useComposableName.ts          # The composable itself
  useComposableName.stories.ts  # The storybook stories for the composable (documentation)
  useComposableName.spec.ts     # The tests for the composable
  ...                           # Other files like types, etc. that are not shared with other composables
```

The folder should be placed in the `src/composables` folder of the package you want to add the composable to.

The composable should be exported in the `index.ts` file in the composable folder.

### Development

We are using [Storybook](https://storybook.js.org/) to develop new components and to display the documentation for them.
Please refer to the [Vue Styleguidist Docs](https://vue-styleguidist.github.io/docs/Documenting.html) for updating or writing new component documentations.

To start storybook to render the documentation run:

```sh
npm run docs
```

To build the docs locally use:

```sh
npm run docs:build
```

## How To Release

1. Run the release workflow using the Actions tab

- Select the release version (SemVer e.g. 1.0.0) and run the release on main branch
  ![image](https://github.com/lion5/component-library/assets/19801231/bd87751a-8dad-442b-b7c9-0841a2acf2e7)


2. After that the workflow creates a release PR after a while. This PR need to be approved, merged and the branch
   deleted.

The workflow should have done the following things:

- Create a new GitHub release
- Publish new packages to the GitHub Packages registry and npmjs.org
- Publish a new documentation on GitHub Pages

## License

component-library is Open Source software released under the [MIT License](License.txt).
