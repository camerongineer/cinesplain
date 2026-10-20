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

# CineSplain Conventions

General rule: match the style of the surrounding code exactly. When in doubt, look at neighboring files before writing.

## Merge readiness

- Before finishing any task whose output is ready to merge (a PR, merge commit, or other integration into `main`), pull the latest changes from `main` (`git fetch origin main` then `git merge origin main` / rebase), resolve any conflicts, and re-check the checks before declaring the work done. Never leave a PR in a conflicted state or merge it against stale `main`.

## Components and functions

- Always declare React components and helper functions as `const` arrow functions. Never use function declarations (`function Foo() {}`).
  - Components with no props: `const HomePage: React.FC = () => { ... }`
  - Components with props: `const NavBar: React.FC<NavBarProps> = ({ onSearchButtonClicked }) => { ... }`
  - Plain functions: `const getNumericId = (idString: string): number => { ... }`
- Constants and module-level objects (`queryOptions`, styled components) are also `const`.

## Formatting

- 4-space indentation, double quotes, semicolons.
- MUI styling via `styled(...)` tagged templates bound to the theme, as in existing components.
- Explicit `.ts` / `.tsx` file extensions on relative imports where existing code does so.

## Architecture

- Data loading goes through TanStack Query `queryOptions` (`src/queries/`); route loaders only warm the cache via the router context's `queryClient`, and components read with `useQuery`.
- Keep API access in `src/api/`, auth helpers in `src/auth/`, types in `src/types/`.
