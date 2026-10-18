# Cinesplain Agent Instructions

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) in the format:

```
<type>(<optional scope>): <short summary>
```

- **Type**: one of `feat`, `fix`, `style`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`
- **Summary**: short, one or two plain sentences. Start with an imperative verb and match the tone of surrounding history (e.g. `feat: Add React Query Devtools`). No conventional-commit type prefix inside the sentence itself.
- **Body (optional)**: only for very large commits, add a body after a blank line with one or two sentences of extra context. No bullet lists needed.

Examples matching this repo:

```
feat: Implement loading screen visibility with delay in Footer component
chore: Simplify initial state setup
```

Large commit example:

```
feat: Upgrade .NET to 10 and React to 19, remove private reuse package

Updated all NuGet and npm packages to latest, migrated ESLint to oxlint + oxfmt, and converted the solution to slnx across three commits' worth of work.
```
