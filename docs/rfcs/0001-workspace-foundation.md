# RFC 0001: Workspace Foundation

## Status
Accepted

## Decision
PantryPal uses an `Nx` monorepo at the repository root. The initial workspace is split into:

- `apps/mobile` for the Flutter client
- `services/*` for Cloud Run TypeScript services
- `packages/*` for shared contracts and config
- `infra/supabase` for database and local backend workflows

## Consequences
- Shared tooling and CI live at the root.
- Flutter remains the primary client foundation, but is orchestrated alongside TypeScript services.
- The legacy prototype stays in place only as a historical reference until the production app replaces it.
