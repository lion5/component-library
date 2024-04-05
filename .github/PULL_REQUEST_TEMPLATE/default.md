# Description

Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change.

Fixes/Closes #(issue number)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist

- [ ] New components are documented in a `.stories.js` Story file, and in the respective component file, the props and
  exposed events / methods are annotated
  using [code comments](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments)
- [ ] Make sure the documentation can be built (see command above - will be verified by CI as well)
- [ ] Please test that your component works properly, by adding a `.spec.{ts|js}` file next to it.
- [ ] New components (atoms, icons, layouts) need to be registered in the respective `index.ts` file,
  e.g. `src/atoms/index.ts`.
