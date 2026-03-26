# PantryPal

PantryPal is evolving from a minimal pantry/shopping-list prototype into a production-grade household food platform. The end goal is a mobile-first product for iPhone and Android, followed by web and macOS, that helps users track inventory, coordinate shopping, reduce food waste, and make better in-store decisions.

## Current Status

This repository currently contains:
- `index.html`: a legacy single-file prototype with localStorage-backed pantry and shopping lists
- `IMPLEMENTATION_PLAN.md`: the technical roadmap from prototype to production deployment
- `PROJECT_ANALYSIS.md`: the business, monetization, and market analysis
- `AGENTS.md`: contributor guidance for working in this repository

The current app is still a static demo. It does **not** yet include auth, sync, backend services, AI scanning, subscriptions, analytics, or app-store-ready mobile clients.

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

## Business Direction

The product is planned as a subscription-first business with no ads in the core experience. The monetization model centers on annual household subscriptions, with a higher AI tier for advanced scanning and store-assistant features. See `PROJECT_ANALYSIS.md` for pricing, cost assumptions, competitor analysis, and break-even planning.

## Running the Prototype

To view the existing demo:

1. Open `index.html` in a browser, or run `python3 -m http.server 8000`
2. Add pantry and shopping items
3. Move items between lists
4. Refresh to confirm localStorage persistence

## Near-Term Repo Priorities

1. Replace the single-file prototype with a production-shaped monorepo
2. Stand up auth, households, pantry, shopping list, and sync
3. Establish the mobile design system and core UX flows
4. Add widgets, reminders, and barcode scanning after the inventory model is reliable
