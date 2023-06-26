# Lion5 Component Library 🎉

This is the Lion5 Component Library. It includes all shared vue3 ui components.

## How To Use

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

❗️ Before creating a release with your changes, check the following ❗️

- [ ] New components are documented in a `.stories.js` Story file, and in the respective component file, the props and
  exposed events / methods are annotated
  using [code comments](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments)
- [ ] Make sure the documentation can be built (see command above - will be verified by CI as well)
- [ ] Please test that your component works properly, by adding a `.spec.{ts|js}` file next to it.
- [ ] New components (atoms, icons, layouts) need to be registered in the respective `index.ts` file,
  e.g. `src/atoms/index.ts`.

Then:

- Merge all changes to the main branch (by creating a PR - which needs to be approved first)
- checkout main branch
- run `npm version <vX.X.X|patch|...>` (see https://docs.npmjs.com/cli/v8/commands/npm-version) to update
  the `package.json` version and auto tag commit
- push the newly generated tag to GitHub (e.g. `git push origin vX.X.X`)
- create a new release for the tag in GitHub
- create a new PR with the new tag into `main`

1. Run the release workflow using the Actions tab

- Select the release type (major, minor, patch) and run the release on main branch
  ![graphic](https://user-images.githubusercontent.com/28068636/221237899-54cccd25-cd09-4758-a34c-d93d65785e98.png)

2. After that the workflow creates a release PR after a while. This PR need to be approved, merged and the branch
   deleted.

The workflow should have done the following things:

- Create a new GitHub release
- Publish a new package to the GitHub Packages registry
- Publish a new documentation on GitHub Pages

## License

component-library is Open Source software released under the [MIT License](License.txt).
