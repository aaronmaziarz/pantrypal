# PantryPal

PantryPal is evolving from a minimal pantry/shopping-list prototype into a production-grade household food platform. The repository now includes the first production-shaped monorepo scaffold for mobile, backend services, shared domain contracts, and Supabase infrastructure, while keeping the original prototype as a legacy reference.

## Current Status

This repository currently contains:
- `index.html`: the original single-file demo with localStorage-backed pantry and shopping lists
- `apps/mobile`: Flutter mobile app scaffold
- `services/api` and `services/workers`: TypeScript Cloud Run service scaffolds
- `packages/domain`: shared domain contracts for future app and backend work
- `infra/supabase`: local Supabase config, migration, and policy layout
- `docs/rfcs`: accepted repository and contract decisions
- `IMPLEMENTATION_PLAN.md`: the technical roadmap from scaffold to production deployment
- `PROJECT_ANALYSIS.md`: the business, monetization, and market analysis
- `AGENTS.md`: contributor guidance for working in this repository

The product is still in foundation stage. It does **not** yet include auth, sync, pantry CRUD, barcode scanning, subscriptions, analytics pipelines, or store-ready mobile builds.

## Product Vision

PantryPal is being designed as a household operating system for groceries and food inventory. Planned capabilities include:
- shared pantry and shopping list management
- expiration tracking and reminders
- barcode scanning and receipt import
- nutrition and recall awareness
- in-store “do I already have this?” guidance
- premium AI-assisted pantry and fridge scanning
- native-feeling widgets, lock-screen surfaces, and fast mobile flows

The UX target is high polish and low friction, especially on iPhone: the product should feel native, glanceable, and calm rather than like a generic cross-platform utility.

## Planned Implementation Path

The selected direction is:
- Flutter as the main cross-platform app foundation
- native iOS and Android integrations where platform-specific UX matters
- Supabase/Postgres for core backend systems
- Cloud Run services for orchestration and integrations
- RevenueCat for subscription management
- mobile-first rollout, then web/PWA, then macOS

See `IMPLEMENTATION_PLAN.md` for the full technical breakdown and phased roadmap.

## Local Setup

The workspace assumes:
- Node.js 22.x and `npm`
- Flutter SDK with Dart
- Java 17
- CocoaPods
- Android SDK platform tools
- Docker Desktop
- Supabase CLI
- Xcode and Xcode Command Line Tools on macOS

On macOS with Homebrew, install the baseline toolchain with:

```bash
brew bundle --file Brewfile
```

Then complete the remaining Apple-managed setup:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Open Android Studio once to finish SDK installation if `adb` is still missing after the Homebrew step.

Bootstrap a clean machine with:

1. Install the required packages above.
2. Run `npm install`
3. Run `npm run env:check`
4. Run `npm run bootstrap`
5. Run `npm run lint`, `npm run test`, and `npm run build`

The environment check will fail with explicit guidance if required tooling is missing.

## Running the Legacy Prototype

To view the original demo:

1. Open `index.html` in a browser, or run `python3 -m http.server 8000`
2. Add pantry and shopping items
3. Move items between lists
4. Refresh to confirm localStorage persistence

## Near-Term Repo Priorities

1. Fill in the mobile app structure with production navigation, state, and design tokens
2. Add auth, households, pantry, shopping list, and sync slices against Supabase
3. Establish CI-stable mobile and backend test coverage
4. Add widgets, reminders, and barcode scanning after the inventory model is reliable
