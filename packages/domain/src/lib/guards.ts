import type { QuantityValue } from "./primitives.js";

export function isQuantityValue(value: unknown): value is QuantityValue {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const candidate = value as QuantityValue;

    return (
        typeof candidate.amount === "number" &&
        Number.isFinite(candidate.amount) &&
        typeof candidate.unit === "string" &&
        candidate.unit.trim().length > 0
    );
}
