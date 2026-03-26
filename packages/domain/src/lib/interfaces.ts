import type {
    Household,
    HouseholdMember,
    PantryItem,
    ShoppingListItem,
    User
} from "./entities.js";

export interface SessionContext {
    userId: string;
    householdId?: string;
}

export interface AuthSessionService {
    getActiveSession(): Promise<SessionContext | null>;
}

export interface HouseholdService {
    listHouseholdsForUser(userId: string): Promise<Household[]>;
    listMembers(householdId: string): Promise<HouseholdMember[]>;
}

export interface PantryService {
    listPantryItems(householdId: string): Promise<PantryItem[]>;
}

export interface ShoppingListService {
    listShoppingItems(householdId: string): Promise<ShoppingListItem[]>;
}

export interface UserService {
    getUser(userId: string): Promise<User | null>;
}
