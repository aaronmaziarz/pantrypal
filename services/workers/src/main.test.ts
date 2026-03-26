import { describe, expect, it } from "vitest";

import { getWorkerHeartbeat } from "./main.js";

describe("worker heartbeat", () => {
    it("exposes the default worker queue", () => {
        expect(getWorkerHeartbeat()).toEqual({
            worker: "workers",
            queue: "default"
        });
    });
});
