import { describe, expect, it } from "vitest";

import { isQuantityValue } from "./lib/guards.js";

describe("domain quantity guards", () => {
    it("accepts valid quantity values", () => {
        expect(isQuantityValue({ amount: 2, unit: "box" })).toBe(true);
    });

    it("rejects invalid quantity values", () => {
        expect(isQuantityValue({ amount: Number.NaN, unit: "" })).toBe(false);
    });
});
