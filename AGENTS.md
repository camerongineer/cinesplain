# CineSplain Conventions

General rule: match the style of the surrounding code exactly. When in doubt, look at neighboring files before writing.

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
