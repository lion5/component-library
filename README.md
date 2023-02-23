# Lion5 Component Library 🎉

This is the Lion5 Component Library. It includes all shared vue3 ui components.

## How to use
Add the library with the following command 
```sh
npm install @lion5/component-library
```

## How to develop
We are using [Storybook](https://storybook.js.org/) to develop new components and to display the documentation for them.
Please refer to the [Vue Styleguidist Docs](https://vue-styleguidist.github.io/docs/Documenting.html) for updating or writing new component documentations.

To start storybook run:
```sh
npm run storybook
```
To build the library locally use:
```sh
npm run build-storybook
```

# How to Release
- Merge all changes to the main branch
- checkout main branch
- run `npm version <vX.X.X|patch|...>` (see https://docs.npmjs.com/cli/v8/commands/npm-version) to update the `package.json` version and auto tag commit
- push the newly generated tag to GitHub (e.g. `git push origin vX.X.X`)
- create a new release for the tag in GitHub
- create a new PR with the new tag into `main`

# How to Add the Component Library to Other Projects
- First you need to add a `.npmrc` to your project root
  - add the following line `//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGE_TOKEN}` (This is required to be able to install the package in the ci)
  - add the following line `@lion5:registry=https://npm.pkg.github.com` (this changes the registry to github for all packages under the @lion5 namespace)
- Then you need to generate a PAT in github to be able to download the package locally
  1. Developer Settings > Personal Access Tokens (classic) and create a new one
  2. Configuration as follows (only read:packages permission): 
    ![image](https://user-images.githubusercontent.com/65423853/220298379-995b0051-fcb8-4875-a5a5-c48b5483da0b.png)
- After that you need to login using the generated PAT `npm login --registry https://npm.pkg.github.com --scope @lion5`
  (might need `--auth-type=legacy`)
  - username is the github username
  - password is the PAT
- Lastly run `npm install @lion5/component-library` to install the package
- To be able to run it in github actions add the following to the root of your workflows
  - See also https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow and https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions#installing-a-package-using-an-action
```yml
permissions:
  contents: 'read'
  packages: 'read'

env:
  GITHUB_PACKAGE_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

