import type {
    AuditFields,
    EntityId,
    InventorySource,
    IsoTimestamp,
    QuantityConfidence,
    QuantityValue
} from "./primitives.js";

export interface User extends AuditFields {
    id: EntityId;
    email: string;
    timezone: string;
    subscriptionStatus: "free" | "plus" | "ai_household";
}

export interface Household extends AuditFields {
    id: EntityId;
    name: string;
    timezone: string;
    defaultStore?: string;
}

export interface HouseholdMember extends AuditFields {
    id: EntityId;
    householdId: EntityId;
    userId: EntityId;
    role: "owner" | "member" | "viewer";
    inviteStatus: "pending" | "accepted" | "revoked";
}

export interface PantryItem extends AuditFields {
    id: EntityId;
    householdId: EntityId;
    productName: string;
    quantity: QuantityValue;
    quantityConfidence: QuantityConfidence;
    lastConfirmedAt: IsoTimestamp;
    lastChangedBy: EntityId;
    location: string;
    source: InventorySource;
}

export interface InventoryLot extends AuditFields {
    id: EntityId;
    pantryItemId: EntityId;
    quantity: QuantityValue;
    opened: boolean;
    expiresAt?: IsoTimestamp;
}

export interface ShoppingListItem extends AuditFields {
    id: EntityId;
    householdId: EntityId;
    name: string;
    quantity: QuantityValue;
    priority: "low" | "medium" | "high";
    preferredStore?: string;
    status: "needed" | "purchased" | "archived";
}
