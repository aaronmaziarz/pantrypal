import { describe, expect, it } from "vitest";

import { getHealthResponse } from "./health.js";

describe("api health response", () => {
    it("returns an ok payload", () => {
        expect(getHealthResponse()).toEqual({
            service: "api",
            status: "ok"
        });
    });
});
