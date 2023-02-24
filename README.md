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
1. Run the release workflow using the Actions tab
   - Select the release type (major, minor, patch) and run the release on main branch
     ![grafik](https://user-images.githubusercontent.com/28068636/221237899-54cccd25-cd09-4758-a34c-d93d65785e98.png)
3. After that the workflow creates a release PR after a while. This PR need to be approved, merged and the branch deleted.

The workflow should have done the following things:
- Create a new github release
- Publish a new package to the Github Packages registry
- Publish a new documentation on Github Pages

