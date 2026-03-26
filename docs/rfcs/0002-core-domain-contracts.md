# RFC 0002: Core Domain Contracts

## Status
Accepted

## Decision
The first shared domain package defines the minimal contract surface required to keep future app and service work aligned:

- `User`
- `Household`
- `HouseholdMember`
- `PantryItem`
- `InventoryLot`
- `ShoppingListItem`

Common metadata primitives are defined once for:

- identifiers
- timestamps
- quantities and units
- source attribution
- confidence tracking

## Consequences
- Domain work starts in `packages/domain` before API wire formats are finalized.
- Services and mobile flows should import these shared contracts instead of redefining entities locally.
- Feature work can layer on top of these contracts without committing to full backend schemas yet.
