# PantryPal Implementation Plan

## 1. Executive Summary
PantryPal currently proves the problem, not the product. The repository is a single static HTML file with localStorage and no backend, auth, sync, testing, analytics, or release pipeline. The production build should be a mobile-first household inventory platform that launches on iPhone and Android first, reaches strong retention there, then expands to web and macOS.

The target product is not just a grocery list. It is a household operating system for food: pantry inventory, shopping coordination, expiration management, store decision support, barcode and receipt capture, nutrition and recall awareness, and premium AI-assisted pantry/fridge recognition. The user experience should feel native, glanceable, and ambient, especially on iPhone, with widgets, lock-screen entry points, and fast scan-first flows.

## 2. Product Principles

### UX Principles
- Design for “obvious next action.” Every major screen should present one primary action and one clear state summary.
- Optimize for fast paths: add item, check stock, scan product, confirm AI results, and start a store trip.
- Build native-feeling surfaces, not generic cross-platform UI. Match Apple Human Interface Guidelines on iPhone and adapt properly on Android.
- Treat widgets, Live Activities, notifications, and shortcuts as product surfaces, not marketing extras.
- Keep the app trustworthy. Show confidence, last-updated timestamps, and editable AI output instead of pretending the system is always right.

### Business Principles
- Subscription-first, no ads in the core product.
- Bootstrapped, lean, and cost-aware from day one.
- Use open/public food data where practical; only add licensed data when it materially improves conversion or retention.
- Gate high-cost AI usage with premium plans and fair-use limits.

## 3. Recommended Architecture

### Client Stack
- Primary app: Flutter for shared UI, state, navigation, offline cache, and cross-platform delivery.
- Native extensions:
  - iOS: Swift/SwiftUI for WidgetKit widgets, lock-screen widgets, ActivityKit Live Activities, App Shortcuts/App Intents, and deeper Apple platform integrations.
  - Android: Kotlin for best-in-class camera and scanning integrations where needed.
- Platforms by phase:
  - Phase 1: iPhone, Android.
  - Phase 2: responsive web/PWA for household management and account access.
  - Phase 3: macOS companion app after mobile product-market fit.

### Backend Stack
- System of record: Postgres.
- Managed backend: Supabase for Postgres, Auth, Storage, Realtime, and row-level security.
- Service layer: TypeScript services on Cloud Run for orchestration, integrations, and heavier business logic.
- Background jobs: queue-driven workers for scan processing, recall sync, nutrition enrichment, notifications, and ML pipelines.
- Observability: Sentry for crash/error monitoring, PostHog for product analytics and feature flags.
- Billing and entitlements: RevenueCat across App Store, Google Play, and later web billing.

### Why This Stack
- Flutter supports one codebase with platform-specific escape hatches for iOS polish and future macOS.
- Supabase reduces initial team size by bundling auth, database, storage, and realtime primitives.
- Cloud Run keeps server costs variable and low during early growth, with generous free tier economics.
- RevenueCat removes cross-store subscription complexity and keeps entitlement logic centralized.

## 4. Core Domain Model
- `User`: identity, preferences, subscription status, privacy settings.
- `Household`: shared pantry boundary, timezone, default store preferences.
- `HouseholdMember`: role, permissions, invite status.
- `Product`: canonical product metadata, name normalization, nutrition, brand.
- `Barcode`: UPC/EAN to product mapping and confidence/source lineage.
- `PantryItem`: household-scoped item record with quantity, unit, location, and confidence.
- `InventoryLot`: per-purchase or per-opened package detail with expiration and storage state.
- `InventoryEvent`: add, consume, discard, move, scan, correction, purchase.
- `ShoppingListItem`: need state, priority, preferred store, substitute candidates.
- `RecallAlert`: recall metadata, severity, affected barcodes/products, status.
- `ScanSession`: camera mode, device, context, latency, result quality, manual corrections.
- `ScanObservation`: raw detection candidate, bbox, OCR text, barcode, classifier output, confidence.
- `Recipe`, `MealPlan`, `PriceObservation`, `NotificationPreference`, `FeatureFlag`, `Subscription`.

Required inventory trust fields:
- `last_confirmed_at`
- `last_changed_by`
- `quantity_confidence`
- `source` (`manual`, `barcode_scan`, `receipt_ocr`, `ai_scene_scan`, `rule`, `sync`)

## 5. External Data Strategy

### Launch Data Sources
- Open Food Facts for broad barcode/product bootstrap and community product coverage.
- USDA FoodData Central for nutrition grounding, especially branded foods and standard nutrient data.
- FDA openFDA food enforcement data for recall alerts.
- USDA FSIS recall feed/API for meat, poultry, and egg-related recalls.
- FoodSafety.gov FoodKeeper guidance for storage and freshness guidance.

### Rules
- Treat all external food data as fallible. Persist source, fetch timestamp, and confidence.
- Never scrape retailer or review sites. Use licensed or partner-approved data only.
- Show nutrition and recall content as informational, not medical advice.

### Data Enrichment Pipeline
1. User scans or searches a barcode.
2. Resolve against internal product cache.
3. If missing or stale, query external sources.
4. Normalize to PantryPal product schema.
5. Store source attribution and freshness timestamp.
6. Serve cached result on future scans.

## 6. AI and Scanning Strategy

### Capability Breakdown
- On-device first:
  - barcode scanning via Apple VisionKit/Vision and Google ML Kit
  - lightweight OCR for receipts and labels where latency matters
  - immediate camera framing guidance
- Cloud-assisted:
  - multi-item fridge/pantry recognition
  - harder OCR recovery
  - cross-frame fusion and deduplication
  - product entity resolution when labels are partial or occluded

### Modes
- `Quick Barcode`: fastest path in store or at home.
- `Receipt Capture`: add a trip’s products at once, then confirm quantities.
- `Shelf/Bag Capture`: multiple packaged products at once.
- `Pantry/Fridge Scene Scan`: premium beta; returns candidate items with confidence and asks for confirmation.
- `Store Advisor`: barcode + product intelligence + home inventory context.

### AI UX Contract
- Barcode result target: sub-second perceived response when product already exists in cache.
- Scene scan target: meaningful draft result in under 5 seconds on strong connectivity.
- Every AI-generated pantry update must be reviewable before it becomes authoritative.
- Low-confidence detections must be visually downgraded and easy to dismiss.
- The app must surface:
  - whether the item is believed to exist at home
  - estimated quantity or stock level
  - when that quantity was last confirmed
  - confidence of the answer

### Practical Rollout
- Do not launch with “fully automatic fridge recognition” as a core promise.
- Start with barcode, receipt OCR, and guided multi-item scan.
- Ship full-scene pantry/fridge recognition as an opt-in premium beta with aggressive telemetry and manual correction capture.

## 7. UX and Design System Plan

### Design Language
- iPhone experience should feel calm, premium, and deeply integrated with Apple system behaviors.
- Use a coherent design system with tokens for color, spacing, typography, radius, elevation, motion, and semantic states.
- Prefer readable density over dashboard clutter.
- Build around glanceability: counts, low-stock items, expiring soon, and active store trip state.

### Ambient Surfaces
- Home screen widgets:
  - pantry summary
  - expiring this week
  - shopping list remaining
  - store mode shortcut
- Lock screen widgets:
  - low-stock count
  - expiring count
  - next trip shortcut
- Live Activities:
  - active shopping trip
  - collaborative shopping updates
  - pickup/fulfillment states if commerce is added later
- App Shortcuts:
  - add item
  - start store mode
  - log a receipt
  - check pantry availability for a typed or spoken product

### Accessibility and Ergonomics
- Dynamic Type
- VoiceOver/TalkBack
- reduced motion
- strong contrast in store lighting
- large tap targets for one-handed use
- offline and stale-data indicators

## 8. Delivery Roadmap

### Phase 0: Foundations
- Create monorepo structure for app, backend services, infra, and docs.
- Set up environments: local, staging, production.
- Implement auth, households, shared state model, telemetry, and design system foundation.
- Set up CI/CD, release signing, store metadata workflow, and crash analytics.

### Phase 1: Core Utility MVP
- Pantry inventory with quantities, units, categories, and locations.
- Shopping lists with collaboration and item movement.
- Expiration dates and reminders.
- Multi-device sync with offline-first local cache.
- Basic widgets and notifications.
- Guest mode for local trial, with upgrade path to account-backed sync.

### Phase 2: Household and Planning
- Shared household roles and invites.
- Consumption history and “running low” logic.
- Recipe import and pantry-aware meal suggestions.
- Store sorting and reusable templates.
- Better list generation from pantry depletion and meal plan gaps.

### Phase 3: Product Intelligence
- Barcode scanning at home and in store.
- Nutrition summary and dietary flags.
- Recall monitoring and affected-item alerts.
- Storage guidance, freshness windows, and discard recommendations.
- “Do I have this?” lookup with last-updated time and stock confidence.

### Phase 4: Premium AI
- Receipt OCR and smart trip import.
- Voice capture for add/check/list flows.
- Multi-product bag/shelf scan.
- Pantry/fridge scene scan beta.
- Smarter replenishment predictions and anomaly detection.

### Phase 5: Expansion
- Web/PWA management surface.
- macOS companion app.
- Retailer/affiliate integrations where partnership economics make sense.
- Licensed reviews or recommendation data if ROI is proven.

## 9. Security, Privacy, and Compliance
- Require privacy policy and public account/data deletion flows.
- In-app account deletion for iOS; in-app plus web deletion path for Google Play compliance.
- Store only the minimum camera/media assets needed for scan improvement and user value.
- Encrypt sensitive data at rest and in transit.
- Use row-level security on all household-scoped records.
- Separate ML training data from core app records; require explicit consent before reusing images beyond immediate inference and debugging.
- Support subscription restore, billing transparency, and clear cancellation guidance.
- Add disclaimers for recalls, nutrition summaries, and dietary recommendations.

## 10. DevOps, QA, and Production Readiness

### CI/CD
- GitHub Actions for test, lint, build, and deployment automation.
- Automated builds for staging and production.
- Store submission playbooks for iOS and Android.
- Database migration discipline with rollback plans.

### Testing
- Unit tests for domain logic, sync rules, quantity handling, reminders, and pricing calculations.
- Integration tests for auth, household sharing, scan ingestion, recall syncing, and billing entitlements.
- End-to-end tests for major user journeys on iOS and Android.
- ML evaluation harness for scan precision, recall, latency, and correction rate.

### Release Gates
- Crash-free sessions above 99.5% before broad paid acquisition.
- Sync conflict rate under agreed threshold.
- Barcode scan perceived latency under 1 second for cached products.
- Recall data freshness SLA within 24 hours of upstream updates.
- Fridge/pantry AI beta only expands when correction rate and user trust metrics are acceptable.

## 11. Success Metrics
- Household activation: first pantry created, first list created, first shared member invited.
- Time to first useful outcome: under 3 minutes from install to first real household value.
- Weekly active households.
- 30-day retention by acquisition cohort.
- Scan success rate and correction rate.
- “Saved me from duplicate purchase” and “used before expiry” events.
- Subscription conversion by feature exposure.
- AI tier gross margin after model costs.

## 12. Immediate Next Steps for This Repo
1. Replace the single-file prototype with a proper monorepo scaffold.
2. Write the architecture RFCs: schema, sync model, mobile platform structure, and entitlement model.
3. Build design concepts for the mobile app before coding feature breadth.
4. Implement a narrow but production-shaped v0:
   - auth
   - households
   - pantry
   - shopping list
   - sync
   - reminders
   - widgets
5. Add barcode scan only after the inventory model is trusted.

## 13. Research Anchors
- Repo baseline: `README.md` in this repository.
- Flutter multi-platform: https://docs.flutter.dev/platform-integration
- Flutter adaptive design: https://docs.flutter.dev/ui/adaptive-responsive
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- Apple widgets guidance: https://developer.apple.com/design/human-interface-guidelines/widgets
- ActivityKit / Live Activities: https://developer.apple.com/documentation/ActivityKit/
- App Shortcuts and App Intents: https://developer.apple.com/documentation/AppIntents/app-shortcuts and https://developer.apple.com/shortcuts/
- App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Account deletion on iOS: https://developer.apple.com/support/offering-account-deletion-in-your-app/
- App Store Small Business Program: https://developer.apple.com/app-store/small-business-program/
- Apple Developer Program pricing: https://developer.apple.com/programs/whats-included/
- Google Play service fees: https://support.google.com/googleplay/android-developer/answer/112622
- Google Play developer registration: https://support.google.com/googleplay/android-developer/answer/6112435
- Google Play Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play account deletion: https://support.google.com/googleplay/android-developer/answer/13327111
- USDA FoodData Central: https://fdc.nal.usda.gov/data-documentation/
- FDA food enforcement API: https://open.fda.gov/apis/food/enforcement/
- FoodKeeper guidance: https://www.foodsafety.gov/keep-food-safe/foodkeeper-app
- Open Food Facts API: https://openfoodfacts.github.io/openfoodfacts-server/api/
- Open Food Facts licensing: https://openfoodfacts.github.io/openfoodfacts-server/api/tutorials/license-be-on-the-legal-side/
- ML Kit barcode scanning: https://developers.google.com/ml-kit/vision/barcode-scanning
- ML Kit text recognition: https://developers.google.com/ml-kit/vision/text-recognition/
- Apple Vision text recognition sample: https://developer.apple.com/documentation/Vision/extracting-phone-numbers-from-text-in-images
- Apple VisionKit camera capture example: https://developer.apple.com/videos/play/wwdc2022/10025/
- Supabase billing and usage: https://supabase.com/docs/guides/platform/billing-on-supabase
- Cloud Run pricing: https://cloud.google.com/run/pricing
- RevenueCat pricing: https://www.revenuecat.com/pricing/
- OpenAI API pricing: https://openai.com/api/pricing
