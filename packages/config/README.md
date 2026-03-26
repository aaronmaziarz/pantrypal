# PantryPal Config Package

This package holds shared repository conventions and reusable configuration fragments.

Initial contents:

- repo-wide TypeScript baseline in [`tsconfig.base.json`](/Users/aaronmaziarz/Personal Projects/pantrypal/tsconfig.base.json)
- repo-wide ESLint flat config in [`eslint.config.mjs`](/Users/aaronmaziarz/Personal Projects/pantrypal/eslint.config.mjs)
- environment/bootstrap scripts in [`scripts`](/Users/aaronmaziarz/Personal Projects/pantrypal/scripts)

As the workspace grows, move reusable lint, formatting, and env helpers into this package instead of duplicating them per project.
