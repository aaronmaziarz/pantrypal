# Repository Guidelines

## Project Structure & Module Organization
This repo currently contains a legacy prototype plus product-planning documents. [`index.html`](/Users/aaronmaziarz/Personal Projects/pantrypal/index.html) is the original single-file demo. [`IMPLEMENTATION_PLAN.md`](/Users/aaronmaziarz/Personal Projects/pantrypal/IMPLEMENTATION_PLAN.md) defines the production architecture and phased delivery plan. [`PROJECT_ANALYSIS.md`](/Users/aaronmaziarz/Personal Projects/pantrypal/PROJECT_ANALYSIS.md) covers market, monetization, and cost modeling. [`README.md`](/Users/aaronmaziarz/Personal Projects/pantrypal/README.md) should stay aligned with the current repo state and roadmap. Until the monorepo rewrite exists, keep prototype-only changes isolated and avoid implying unbuilt production capabilities already exist.

## Build, Test, and Development Commands
There is no production build yet; only the prototype is runnable.

- `open index.html` opens the app directly in the default browser on macOS.
- `python3 -m http.server 8000` serves the repo locally if you want a simple browser-based workflow.
- `git status` verifies the working tree before committing.

Use browser DevTools to inspect `localStorage`, console errors, and DOM updates in the current demo. When implementation starts, follow the stack and delivery order in `IMPLEMENTATION_PLAN.md` instead of introducing an ad hoc structure.

## Coding Style & Naming Conventions
For the legacy prototype, use 4-space indentation and descriptive camelCase names such as `renderLists` or `moveToPantry`. For documentation, prefer concise, decision-oriented writing and keep roadmap, pricing, and platform claims consistent across `README.md`, `IMPLEMENTATION_PLAN.md`, and `PROJECT_ANALYSIS.md`. If new code is added, it should follow the planned production direction: mobile-first, shared core architecture, native-quality UX, and clear separation between app, backend, and infrastructure concerns.

## Testing Guidelines
There is no automated suite yet. For prototype changes, manually verify:

- add items to pantry and shopping list
- move items between lists
- refresh the page and confirm `localStorage` persistence
- check empty, whitespace, and quantity edge cases

For future implementation work, add tests alongside the production architecture in the implementation plan: unit tests for domain logic, integration tests for sync/data flows, and end-to-end tests for key mobile journeys.

## Commit & Pull Request Guidelines
The current history uses short, descriptive commits with a feature prefix, for example `MVP: PantryPal - Smart grocery & pantry manager`. Continue using concise, outcome-focused subjects. Pull requests should state whether they change the prototype, the roadmap docs, or both; include manual test notes for prototype edits; and include screenshots for UI/document updates when helpful. If roadmap decisions change, update all affected top-level docs in the same PR.
