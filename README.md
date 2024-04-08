# Lion5 Component Library 🎉

This is the Lion5 Component Library. It includes all shared vue3 ui components.
The project setup is done based on [NX](https://nx.dev/) to leverage dependency graph and caching functionalities.

## How To Use (NPM registry)
Packages can be found here https://www.npmjs.com/search?q=%40lion5
```shell
npm install @lion5/component-library
pnpm add "@lion5/component-library"
yarn add @lion5/component-library
```

## How To Use (Github registry)
Packages can be found here https://github.com/orgs/lion5/packages?repo_name=component-library
1. First you need to add a `.npmrc` to your project root

   - add the following line `@lion5:registry=https://npm.pkg.github.com` (this changes the registry to GitHub for all
     packages under the `@lion5` namespace)

2. Install the package:

```shell
npm install @lion5/component-library
pnpm add "@lion5/component-library"
yarn add @lion5/component-library
```

3. Check out our [Storybook](https://lion5.github.io/component-library/)! This is the main reference to all components.

## How To Develop

We are using [Storybook](https://storybook.js.org/) to develop new components and to display the documentation for them.
Please refer to the [Vue Styleguidist Docs](https://vue-styleguidist.github.io/docs/Documenting.html) for updating or
writing new component documentations.

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
